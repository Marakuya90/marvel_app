import './charInfo.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types'
class CharInfo extends Component {

    marvelService = new MarvelService();

    state = {
        char: null,
        loading: false,
        error: false
    }

    componentDidMount(){
        this.updateChar()
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.charId !== prevProps.charId) {
            this.updateChar()
        }
    }

    updateChar = () => {
        const {charId} = this.props;
        if (!charId) {
            return
        }
        
        this.onCharLoading();

        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }
    
    onCharLoaded = (char) => {
        this.setState({
            char, 
            loading:false
        })
        console.log(this.state.char)
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = () => {
        this.setState({
            loading:false,
            error:true
        })
    }


    render() {
        const {char, loading, error} = this.state;

        const skeleton = char || loading || error ? null : <Skeleton/>
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null; 
        const content = !(loading || error || !char)?<View char={char}/>:null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        ) 
    }
}

const View = ({char}) => {

    const {thumbnail, name, homepage, wiki, description, comics} = char;

    let imgStyle = {'objectFit' : 'cover'};
        if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
            imgStyle = {'objectFit' : 'contain'}
        }

    function renderComics(arr) {
        if (arr.length !== 0) {
                let viewComics = arr.map((item,i) => {
                return (
                    <li key={i} className="char__comics-item">
                        {item.name}
                    </li>
                )
            })
            return viewComics
        }
        return <p>There are no comics for this character</p>
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                    {renderComics(comics)}
            </ul>
        </>
    )
}

CharInfo.propType = {
    charId: PropTypes.number
}
 
export default CharInfo;