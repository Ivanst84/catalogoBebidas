import { useEffect, useMemo,useState} from "react"
import {NavLink,useLocation} from "react-router-dom"
import{useAppStore} from '../stores/useAppStore'
export default function Header() {

    const {pathname}=useLocation()
    
    const [searchFilters,setSearchFilters]=useState({ingredient:'',category:''})
    const isHome=useMemo(()=>pathname==='/',[pathname])
    
   const fetchCategories= useAppStore((state)=>state.fetchCategories)
   const categories= useAppStore((state)=>state.categories)

   const searchRecipes= useAppStore((state)=>state.searchReicpes)
   const showNotification = useAppStore((state) =>state.showNotification)
  
  
   useEffect(()=>{

        fetchCategories()
    },[])
   const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        setSearchFilters({
            ...searchFilters,
            [e.target.name]:e.target.value
        })
      } 

      const handleSubmit =
      (e:React.FormEvent<HTMLFormElement>)=>{
          e.preventDefault()
 
          if(Object.values(searchFilters).includes('')){
            
            showNotification(

              {
                text : 'Todos los campos son obligatorios',
                error:true
              }

            )


              return
          }
          searchRecipes(searchFilters)}
    return (
    
    <header className={isHome ? 'bg-header bg-center bg-cover':'bg-slate-800'}>

       <div className='mx-auto container px-5 py-16'>

    <div className='flex justify-between items-center'>
        <div>
            <img className='w-32'src='/logo.svg' alt='logo' />
        </div>
        <nav className="flex gap-4">
          <NavLink  to='/' 
          className={({isActive}) => 
           isActive?'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'}>
          Inicio </NavLink>
          <NavLink to='/favoritos' 
          
          className={({isActive}) => 
           isActive?'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'}>
          Favoritos </NavLink>
        </nav>
</div>

  {isHome &&(
    <form onSubmit={handleSubmit} className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounder-lg shadow- space-y-6">

        <div className="space-y-4">
            <label
             htmlFor="ingredient"
             className='block text-white uppercase font-extrabold text-lg' >
                Nombre o Ingredientes
              </label>
              <input 
              id='ingredient'
              type="text"
              name='ingredient'
                className='w-full p-3 rounded-lg focus:outline-none'
                placeholder="Buscar por nombre o ingredientes"
                onChange={handleChange}
                value ={searchFilters.ingredient}
               />
             
        </div>
      

        <div className="space-y-4">
            <label
             htmlFor="category"
             className='block text-white uppercase font-extrabold text-lg' >
                Categoria
              </label>
              <select 
              id='category'
              name='category'
                className='w-full p-3 rounded-lg focus:outline-none'
                onChange={handleChange}
                value ={searchFilters.category}
              >
                <option value="">---Seleccione ---</option>
                 {categories.drinks.map(category =>(
                     <option 
                     key={category.strCategory} 
                     value={category.strCategory}>
                         {category.strCategory}
                      </option>
                  
               ) )}
             </select>
        </div>
        <input
        type="submit"
        value="Buscar"
        className='w-full bg-orange-800 hover:bg-orange-900 text-white  uppercase font-extrabold p-2 rounded-lg cursor-pointer'
        
        
        ></input>
    </form>


  )}
</div>

    </header>
  )
} 

