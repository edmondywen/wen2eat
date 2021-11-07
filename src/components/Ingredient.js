/*
TODO: need a star next to the name to favorite 

Ingredient
the individual ingredient element. 

props: 

states:
- isFavorite: boolean that indicates if the ingredient should be prioritized during recipe search 
*/

function Ingredient(props) {
    return (
        <p>{props.itemName}</p>
    );
}

export default Ingredient;