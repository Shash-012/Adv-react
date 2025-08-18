# Advance React

## Transforming Lists

A list represents an array in JavaScript, this can contain any type of data, most common element data type to encounter is an object. You may need to write more code just to retrieve information you need, which is where the map method comes in. It is a way to ignore everything you do not want displayed on the screen, and extract only the data the users care about. 

```jsx
const data =[
    {
        id: "1",
        title: "Tiramisu",
        description: "The best tiramisu in town",
        image: "https://picsum.photos/200/300/?random",
        price: "$5.00",
    },
    {
        id: "2",
        title: "Lemon Ice Cream",
        description: "Mind blowing taste",
        image: "https://picsum.photos/200/300/?random",
        price: "$4.50",
    },
    {
        id: "3",
        title: "Chocolate mousse",
        description: "Unexplored flavour",
        image: "https://picsum.photos/200/300/?random",
        price: "$6.00",
    }
];

const topDessert = data.map(dessert =>{
    return {
        content: `${dessert.title} - ${dessert.description}`,
        price: dessert.price,
    }
})
```

A new variable is defined, since the map method always returns a new array. We first apply it to the original data array. It goes element by element and transforms the data into whatever the function entered as the arguments'  return statement is. 

With react, we can transform any list of items into a collection of React components. 

```jsx
function App(){
    const listItems = topDesserts.map(dessert => {
        const itemText = `${dessert.title} - ${dessert.price}`
        return <li>{itemText}</li>
    })
    return(
        <div>
            <ul>
                {listItems}
            </ul>
        </div>
    )
}
```

here the map function returns a JSX <li> element for each object in the data array, which is then rendered under the app component's <ul> tags. 

You can also perform different operations on the same array at once.
```jsx
function DessertsList(props) {

  const lowCalorieDessert = props.data.filter(dessert => {
    return dessert.calories <= 500;
  }).sort((a, b) => {
    return a.calories - b.calories;
  }).map(dessert => {
    return (
      <li>{dessert.name} - {dessert.calories}</li>
    )
  })

  return (
    <ul>
      {lowCalorieDessert}
    </ul>
  );
}

export default DessertsList;
```
here first the input array gets filtered, then it gets sorted, then finally it gets mapped, where we get the return statement containing the element to be rendered. 