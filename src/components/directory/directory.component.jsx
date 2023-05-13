 import "./directory.style.scss";
 import CategoryItem from "../category-items/category-item.component";
const Directory=({cateogries})=>{ 
    return( 
        <div className="categories-container">  
        {cateogries.map((category)=>(
              <CategoryItem key={category.id} cateogry={category}/> 
        ))}
        </div>
    )

} 

export default Directory;