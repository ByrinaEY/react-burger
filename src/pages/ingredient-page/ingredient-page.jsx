import IngredientDetails from '../../components/ingredient-details/ingredient-details';

export  function IngredientPage() {
    dispatch({ type: SET_DISPLAYES_INGREDIENT, ingredient: data });
    return (
        <main className="page-container">
            <div className="page-container-inner">
          
                <IngredientDetails />
            </div>
        </main>
    );
}

