class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    _apiKey = 'apikey=13db8e0ddf820a6980f5565abcc74cd8'
    _baseOffset = 210

    getResourse = async (url) => {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error (`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResourse(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter)
    }
    
    getCharacter = async (id) => {
        const res = await this.getResourse(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0])
    }

    _transformCharacter = (char) => {
        return {
                name: char.name,
                id:char.id,
                description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
                thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension ,
                homepage: char.urls[0].url,
                wiki: char.urls[1].url,
                comics:char.comics.items.length !== 0? char.comics.items.slice(0,10): char.comics.items
        }
    }
}

export default MarvelService;

