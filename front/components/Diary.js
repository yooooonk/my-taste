const Diary = ({diary})=>{
    console.log(diary.title)
    return (
      <div className="Diary">
        {diary.title}
      </div>
    );
};


export default Diary;