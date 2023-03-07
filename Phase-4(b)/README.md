# Phase - 4(a):
## <u>Aim</u> : 
Same as [Phase-4(a)](../Phase-4(a)/) but just a slight change to the **Neighbourhood Condition**.

For this Phase, we consider **_3 Local Neighbours_** and **_1 Global Neighbour_**

## <u>File Structure Description</u> :
- [graph.png](./graph.png) - It is the resultant graph of the whole Phase

- [model.js](./model.js) - It is the implementation of the model where we supply different values of "p_h" and then treat the **Neighbourhood Condition** as mentioned above and generate the results to be stored in [res.json](./res.json).


- [main.js](./main.js) - The Controller Script for the different values of "p_h" to be fed in the [model.js](./model.js)

- [res.json](./res.json) - The Resultant JSON generated for the different values of "p_h" considering the the **Neighbourhood Condition** as mentioned above.

- [main.py](./main.py) - Python File for using the [res.json](./res.json) and plotting the graphs for different values of "p_h" considering the the **Neighbourhood Condition** as mentioned above.