import {useLoaderData, Link} from "react-router-dom"
import axios from "axios"
import Wrapper from "../assets/wrappers/CocktailPage"
import {useQuery} from "@tanstack/react-query"
import { Navigate } from "react-router-dom";

const singleCocktailUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

  const singleCocktailQuery = (id) => {
    return {
      queryKey: ['singleCocktail', id],
      queryFn: async () => {
        const {data}= await axios.get(`${singleCocktailUrl}${id}`);
        return data;
      },
    };
  }

export const loader =(queryClient)=> async ({params}) => {
  const {id} = params
  await queryClient.ensureQueryData(singleCocktailQuery(id))
  return {id}
}

const Cocktail = () => {
  const {id} = useLoaderData()
  
const {data} = useQuery(singleCocktailQuery(id))

  if(!data) return <Navigate to="/"  />

  const singleDrink = data.drinks[0] 
  const {strDrink:name, strDrinkThumb:image, strAlcoholic:info,strCategory:category, strGlass:glass, strInstructions:instructions} = singleDrink

  const validIngredients = Object.keys(singleDrink)
    .filter((key) => key.startsWith("strIngredient") && singleDrink[key])
    .map((key) => singleDrink[key]);

  const validMeasures = Object.keys(singleDrink)
    .filter((key) => key.startsWith("strMeasure") && singleDrink[key])
    .map((key) => singleDrink[key]);

  const ingredientsWithMeasures = validIngredients.map((ingredient, index) => {
    const measure = validMeasures[index] || "";
    return `${measure} ${ingredient}`.trim();
  });


  return (
    <Wrapper>
      <header>
        <Link to="/" className="btn">
          Back Home
        </Link>
      <h3>{name}</h3>
      </header>
      <div className="drink">  
        <img src={image} alt={name} className="img"  />
        <div className="drink-info">
          <p>
            <span className="drink-data">name :</span> {name}
          </p>
          <p>
            <span className="drink-data">category :</span> {category}
          </p>
          <p>
            <span className="drink-data">info :</span> {info}
          </p>
          <p>
            <span className="drink-data">glass :</span> {glass}
          </p>
          <p>
            <span className="drink-data">ingredients :</span> {ingredientsWithMeasures.join(", ")}
          </p>
          <p>
            <span className="drink-data">instructions :</span> {instructions}
          </p>
        </div>
      </div>
    </Wrapper>
  )
}
export default Cocktail