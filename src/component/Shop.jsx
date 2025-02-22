import React, { useEffect, useState } from "react";
import { getProduct } from "../Store/ActionCreators/ProductActionCreators";
import { getMaincategory } from "../Store/ActionCreators/MaincategoryActionCreators";
import { getSubcategory } from "../Store/ActionCreators/SubcategoryActionCreators";
import { getBrand } from "../Store/ActionCreators/BrandActionCreators";
import { useDispatch, useSelector } from "react-redux";
import Products from "./partials/Products";
export default function Shop() {
  let [products, setProducts] = useState([]);
  let [mc, setMc] = useState("");
  let [sc, setSc] = useState("");
  let [br, setBr] = useState("");
  let[flag,setFlag]=useState(false)
  let [search,setSearch]=useState("")
  let [min,setMin]=useState(0)
  let [max,setMax]=useState(1000)


  let dispatch = useDispatch();
  let ProductStateData = useSelector((state) => state.ProductStateData);
  let MaincategoryStateData = useSelector((state) => state.MaincategoryStateData);
  let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData);
  let BrandStateData = useSelector((state) => state.BrandStateData);

  function filterData(mc,sc,br,min=-1,max=-1) {
    let data = [];
    if (mc === "" && sc === "" && br === "")
       data =ProductStateData;
    else if (mc !== "" && sc === "" && br === "")
      data = ProductStateData.filter((x) => x.maincategory?.name === mc);
else if (mc==="" && sc !== "" && br==="" )
  data =ProductStateData.filter((x)=>x.subcategory?.name===sc)
else if (mc==="" && sc==="" && br !=="")
  data=ProductStateData.filter((x)=> x.brand?.name===br)
else if (mc!=="" && sc!=="" && br ==="")
  data=ProductStateData.filter((x)=> x.maincategory?.name===mc && x.subcategory?.name ===sc)
else if (mc!=="" && sc==="" && br !=="")
  data=ProductStateData.filter((x)=> x.maincategory?.name===mc && x.brand?.name ===br)
else if (mc==="" && sc!=="" && br !=="")
  data=ProductStateData.filter((x)=> x.subcategory?.name ===sc && x.brand?.name ===br )
else
data=ProductStateData.filter((x)=>x.maincategory?.name===mc && x.subcategory?.name ===sc && x.brand?.name ===br )

if(min===-1 || max===-1)
    setProducts(data);
  else
  setProducts(data.filter((x)=>x.finalPrice >= min && x.finalPrice <= max))
  }

  function filterProducts(mc, sc, br) {
    setMc(mc);
    setSc(sc);
    setBr(br);

    filterData(mc, sc, br);
  }

  function sortFilter(option){
if(option==="1")
  setProducts(products.sort((x,y)=>y._id.localCompare(x._id)))
else if(option==="2")
  setProducts(products.sort((x,y)=>x.finalPrice-y.finalPrice))
else
setProducts(products.sort((x,y)=>y.finalPrice-x.finalPrice))

setFlag(!flag)
  }

function postSearch(e){
  e.preventDefault()
  let src=search.toLowerCase()
  setProducts(ProductStateData.filter(x=>x.name.toLowerCase().includes(src) || x.maincategory?.name.toLowerCase() ===src 
  || x.subcategory?.name.toLowerCase() ===src  || x.brand?.name.toLowerCase() ===src || x.color.toLowerCase() ===src 
  || x.description?.toLowerCase().includes(src)))
}

// function searchRecord(e){
//   let src=search.toLowerCase()
//   setProducts(ProductStateData.filter(x=>x.name.toLowerCase().includes(src) || x.maincategory?.name.toLowerCase() ===src 
//   || x.subcategory?.name.toLowerCase() ===src  || x.brand?.name.toLowerCase() ===src || x.color.toLowerCase() ===src 
//   || x.description?.toLowerCase().includes(src)))
// }

  useEffect(() => {
    (() => {
      dispatch(getProduct());
      if (ProductStateData.length) 
        setProducts(ProductStateData);
    })();
  }, [ProductStateData.length]);

function postPriceFilter(){
filterData(mc,sc,br,min,max)
}

  useEffect(() => {
    (() => {
      dispatch(getMaincategory());
    })();
  }, [MaincategoryStateData.length]);

  useEffect(() => {
    (() => {
      dispatch(getSubcategory());
    })();
  }, [SubcategoryStateData.length]);

  useEffect(() => {
    (() => {
      dispatch(getBrand());
    })();
  }, [BrandStateData.length]);
  return (
    <>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-2">
            <div className="list-group mb-3">
 <button className="list-group-item list-group-item-action active" aria-current="true" >Maincategory</button>
  <button className="list-group-item list-group-item-action" onClick={() => filterProducts("", sc, br)} > All</button>
              {
              MaincategoryStateData && MaincategoryStateData.map((item, index) => {
 return <button key={index} className="list-group-item list-group-item-action" onClick={()=> filterProducts(item.name, sc, br)}>{item.name}</button> 
})
               }
     </div>

     <div className="list-group mb-3">
 <button className="list-group-item list-group-item-action active" aria-current="true" >Subcategory</button>
  <button className="list-group-item list-group-item-action" onClick={() => filterProducts(mc, "", br)} > All</button>
              {
              SubcategoryStateData && SubcategoryStateData.map((item, index) => {
 return <button key={index} className="list-group-item list-group-item-action" onClick={()=> filterProducts(mc,item.name, br)}>{item.name}</button> 
})
               }
     </div>

     <div className="list-group mb-3">
 <button className="list-group-item list-group-item-action active" aria-current="true" >Brand</button>
  <button className="list-group-item list-group-item-action" onClick={() => filterProducts(mc, sc, "")} > All</button>
              {
             BrandStateData && BrandStateData.map((item, index) => {
 return <button key={index} className="list-group-item list-group-item-action" onClick={()=> filterProducts(mc, sc, item.name)}>{item.name}</button>
})
               }
     </div>



     <div className="mb-3">
      <h5 className="text-light bg-primary p-2">Price Filter</h5>
      <div className="mb-3">
        <label>Min</label>
        <input type="number" name="min" value={min} onChange={(e)=>setMin(e.target.value)} className="form-control " placeholder="Minimum Amount"/>
      </div>
      <div className="mb-3">
        <label>Max</label>
        <input type="number" name="max" value={max} onChange={(e)=>setMax(e.target.value)} className="form-control" placeholder="Maximum Amount"/>
      </div>
      <div className="mb-3">
        <button onClick={postPriceFilter} className="btn btn-primary w-100 ">Apply Filter
          
        </button>
      </div>
     </div>
     
        </div>           

          <div className="col-md-10">
<div className="row">
  <div className="col-md-9">
    <form onSubmit={postSearch}>
      <div className="btn-group w-100">
        <input onChange={(e)=>setSearch(e.target.value)} type="search" name="search" className="form-control border-primary border-3" placeholder="Search Products by Name Color ,Size,Brand,Category Etc." />
<button type="submit" className="btn btn-primary"><i className="fa fa-search"></i></button>
      </div>
    </form>
  </div>
  <div className="col-md-3">
    <select onChange={(e)=>sortFilter(e.target.value)} name="sort" className="form-select border-primary border-3">
      <option value="1" >Latest</option>
      <option value="2">Price : L to H</option>
      <option value="3">Price : H to L</option>
    </select>
  </div>
</div>
  <Products title={`Maincateogory=${mc?mc:"All"} Subcategory=${ sc?sc:"All"} Brand=${br?br:"All"}`} data={products}/>
          </div>
        </div>
      </div>
    </>
  );
}
