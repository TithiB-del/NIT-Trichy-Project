# Phase - 3:
## <u>Aim</u> : 
In this Phase, we basically vary the Main Rules of the Model Simulation. Instead of taking at least **"1" Neighbour** Condition for State Changes, we take **"k" Neighbours** and **"l" Neighbours** for the two rules respectively. Again, as before we vary "p_h" and so we get 16 Results for every 3 Value of "p_h" since **1<=k<=4** and **1<=l<=4**


## <u>File Structure Description</u> :
- [Graphs/Images](./Graphs/Images) - This Folder Contains the 16 Graphs for the Whole Phase.


 - [Graphs/GraphScript/slave.py](./Graphs/GraphScript/slave.py) - Given the Values of **"k"** and **"l"** parameters, it accordingly generates the Graph from the Correct Result File.

- [Graphs/GraphScript/master.py](./Graphs/GraphScript/master.py) - This is the Controller Script for [Graphs/GraphScript/slave.py](./Graphs/GraphScript/slave.py).


<hr>

- [Results](./Results/) - This Folder Contains the 16 Result JSON Files for the whole phase.

- [model.js](./model.js) - This is the main Implementation of the Model where we supply the **"k"** and **"l"** parameters along with the previous parameters in the Constructor.

- [slave.js](./slave.js) - This File takes in the given values of **"k"** and **"l"** parameters and accordingly generates the Result JSON with appropriate File Name.

- [master.js](./master.js) - This is the Controller Script for [slave.js](./slave.js). For all the possible values of **"k"** and **"l"** we make a Model using [slave.js](./slave.js) and acquire the results.