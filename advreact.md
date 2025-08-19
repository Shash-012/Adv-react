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

## Keys

While updating the UI of an app, React uses its Diffing Algorithm to calculate the minimum number of components that need to be changed in the tree of components. Although this algo works most of the time, there are some cases where react cannot make important assumptions to find the most optimal path for an update, which means the developer will need to step in. 

imagine the drinks section
```jsx
<ul>
    <li>Beer</li>
    <li>wine</li>
</ul>
```
When adding element to the end of this list, the Diffing algorithm works well, since react will match the two Beer trees, match the two Wine trees, and then inserts the new element.

However while adding element to beginning of the list, algo offers worse performance, bec React will mutilate every child, instead of realising that it can keep Beer and Wine subtrees intact.

To solve this issue React supports a Key attribute. Keys are identifiers that help react determine which items are changed, added or removed. Also act as instructors on how to treat a specific element when an update happens, and whether its internal state should be preserved or not. 

Adding a key to the <li> elements makes the tree efficient, this looks like:
```jsx
<ul>
    <li key='Beer'>Beer</li>
    <li key='Wine'>Wine</li>
</ul>

<ul>
    <li key="Cider">Cider</li>
    <li key='Beer'>Beer</li>
    <li key='Wine'>Wine</li>
</ul>
```

Now react knows that the element with the key cider has been added, and the elements with the keys Beer and Wine have just moved.
General rule is to use a stable identifier, that is unique within its siblings. This allows react to reuse as many elements from the list as possible, avoiding unnecessary recreations, especially when their contents is exactly the same, and the only thing that has changed is their position in the list.

The key used most often is a unique ID that comes from the data. These IDs mostly mirror database IDs, which is the ID given to an item in a database that by nature is gauranteed to be unique. What happens in cases where data doesn't have any suitable ID or we are rendering a list that is not dependent on server data. math.random() to generate keys is bad, because on re-rendering, a new key is generated, which the app will now have to trace again. index values could work, but face a problem when modifying positions by sorting or adding/removing items. 

keys when used improperly negatively affect performance, and the user faces internal glitches.

Keys tell React which array item each component corresponds to, so that it can match them up later. This becomes important if your array items can move (e.g. due to sorting), get inserted, or get deleted. A well-chosen key helps React infer what exactly has happened, and make the correct updates to the DOM tree. --> Official React documentation 