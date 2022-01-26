interface itemI{
    name:string,
    showDetails:boolean,
    image_link:string
  }
  interface ITEM{
      item:itemI
  }
const ItemDetails=({item}:ITEM)=>{
    return(
        <div>
            <img className={"image-link"} src={item.image_link}/>
        </div>

    )
}
export default ItemDetails