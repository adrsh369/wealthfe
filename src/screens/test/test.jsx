import { div, li } from 'framer-motion/client';
import react, { useEffect, useState } from 'react'


const Text = () => {
    const [listData, setListData] = useState([]);

    const fetchApi = async () => {
        try {

            const api = 'https://jsonplaceholder.typicode.com/todos';
            const response = await fetch(api);

            const data = await response.json();
            // console.log("response", data)

            if (response) {
                setListData(data)
            }
        } catch (error) {
            console.log("error", error)
        }
    }

    useEffect(() => {
        fetchApi();
    }, [])


    const list = [1, 2, 3, 4, 5,];

    const maped = list.map((item) => item * 2)
    const filtered = list.filter((item) => item % 2 === 0)
    const some = list.some((item) => item % 2 === 0)
    const every = list.every((item) => item > 2)
    const reduce = list.reduce((acc, item) => acc + item, 0)

    const numbers = [1, 2, 3, 4, 5,];

    const evens = numbers.reduce((acc, n) => {
        console.log("acc", acc)
        if (n % 2 === 0) acc.push(n);
        return acc;
    }, []);

    const array = ["a", "b", "a"];

    const buildArray = array.reduce((acc, n) => {
        acc[n] = (acc[n] || 0) + 1;
        return acc;
    }, {})


    const objectEntery = Object.entries(buildArray)

    console.log("reduce", objectEntery)

    for (var i = 0; i < 3; i++) {
        setTimeout(() => console.log("sdsde", i), 100);
    }

    for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log("Sdsds",i), 100);
}

    return (

        <div className='container'>

            <h1>List Data</h1>
            {/* {listData.map((list) => (
                
              <li key={list.id}>{list.title}</li>
            ))} */}



            {listData.map((item) => (
                <div key={item.id}>{item.title}</div>
            ))}

        </div>
    );

}

export default Text;