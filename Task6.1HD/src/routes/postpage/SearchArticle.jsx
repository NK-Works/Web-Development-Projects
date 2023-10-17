import ArticleList from "./ArticleList";
import './ArticlePage.css'
const SearchArticle = () => {
    
    return (
        <div>
            <br />
            <div className="articlePage">
                <h1>--- Featured Articles ---</h1>
            </div>
            <br />
            <ArticleList
            />
        </div>
    )
}

export default SearchArticle;
