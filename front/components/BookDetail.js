import { useSelector } from "react-redux";

const BookDetail = ()=>{
    const {detailBook} = useSelector((state)=>state.book)
    
    const authors = `${detailBook.authors[0]} ${detailBook.authors.length>2? '외': ''}`
    const status = `${detailBook.status? '': '절판'}`

    return (
      
      <div className="BookDetail" >
        
        <div className="bookInfo">
          <img src={detailBook.thumbnail}/>
          <div className="bookInfo-content">
            <div className="title">{detailBook.title}</div>
            <div className="author">{authors}</div>
            <div className="translator">{detailBook.translators}</div>
            <div className="publisher">{detailBook.publisher} </div>
            <div className="price">&#128181;{detailBook.price}원 <span>{status}</span> </div>
            <div className="description">
              {detailBook.contents}
              <a href={detailBook.url} target="_blank"> 자세히</a>
            </div>                    
          </div>
        </div>
        
        <div className="button-box">
            <button>읽을 책에 추가</button>
            <button>기록하기</button>
        </div>  
      
      </div>
    );
};

/* AppLayout.propTypes = {
    children : propTypes.node.isRequired
}; */

export default BookDetail;