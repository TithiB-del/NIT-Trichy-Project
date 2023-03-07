/* Utility Class*/
class Utils {
  getRandomNum = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
}


/* Stock Market Analyser Class*/
export class Stock_Market_Dynamics_Emulator {
  constructor(size_tuple, p_d, p_h, p_c) {
    this.size_tuple = size_tuple;
    this.p_d = p_d;
    this.p_h = p_h;
    this.p_c = p_c;

    // "Started" flag is used for showing the Initial Config at first 
    this.started = false;
    this.UtilsObject = new Utils();

    // Filling the New Grid with 0s
    this.config = [];
    for (let i = 0; i < this.size_tuple[0]; i++) {
      let temp = new Array();

      for (let j = 0; j < this.size_tuple[1]; j++) {
        temp.push(0);
      }
      this.config.push(temp);
    }

    // Getting a Random Initial Configuration
    this.getRandominitialConfig();
  }

  // <= 27% will be active traders
  getRandominitialConfig() {
    let CountOfActiveTraders = 0;

    for (let i = 0; i < this.size_tuple[0]; i++) {
      for (let j = 0; j < this.size_tuple[1]; j++) {

        // Checking for that <= 27% condition
        if(CountOfActiveTraders >= (this.size_tuple[0] * this.size_tuple[1]) * 0.27){
          this.config[i][j] = 0;
          continue;
        }
        
        // Checking Activeness of trader(If Even then active, else not)
        let r1 = this.UtilsObject.getRandomNum(1, 10000);

        if (r1 % 2 == 0)
          this.config[i][j] =
            this.UtilsObject.getRandomNum(1, 10000) % 2 == 0 ? 1 : -1;
        else this.config[i][j] = 0; 

        // Increasing the Count of Active Traders
        this.config[i][j] == 0 ? CountOfActiveTraders : CountOfActiveTraders += 1
      }
    }
  }

  // Checking if the Neighbour is a Legit Neighbour within the bounds of the Grid
  isLegit = (i,j) =>  (i >= 0 && i < this.config.length) && (j >= 0 && j < this.config[0].length)

  // Function to find the Possible Neighbours of a given cell given its coordinates in the grid
  FindNeighbours(i, j) {
    const neighbourhoodVector = [
      [-1, 0],
      [1, 0],
      [0, 1],
      [0, -1],
    ];
    const neighbours = [];

    neighbours.push(
      this.isLegit(i + neighbourhoodVector[0][0], j + neighbourhoodVector[0][1])
        ? this.config[i + neighbourhoodVector[0][0]][
            j + neighbourhoodVector[0][1]
          ]
        : 0
    );

    neighbours.push(
      this.isLegit(i + neighbourhoodVector[1][0], j + neighbourhoodVector[1][1])
        ? this.config[i + neighbourhoodVector[1][0]][
            j + neighbourhoodVector[1][1]
          ]
        : 0
    );

    neighbours.push(
      this.isLegit(i + neighbourhoodVector[2][0], j + neighbourhoodVector[2][1])
        ? this.config[i + neighbourhoodVector[2][0]][
            j + neighbourhoodVector[2][1]
          ]
        : 0
    );

    neighbours.push(
      this.isLegit(i + neighbourhoodVector[3][0], j + neighbourhoodVector[3][1])
        ? this.config[i + neighbourhoodVector[3][0]][
            j + neighbourhoodVector[3][1]
          ]
        : 0
    );

    return neighbours;
  }

  // Generator Function for the Simulation Process
  *simulate() {

    // Capture the Start
    if (!this.started) {
      this.started = true;
      yield this.config;
    }

    // Creating an Infinite Loop of Simulation Cycle.Since its Generator function, so not a problem
    while (1) {
      // Creating a new Grid and fill it with zeroes
      let newConfig = [];

      for (let i = 0; i < this.config.length; i++) {
        let temp = [];

        for (let j = 0; j < this.config[0].length; j++)
          temp.push(this.config[i][j]);

        newConfig.push(temp);
      }

      // Iterating through the Original Grid
      for (let i = 0; i < this.config.length; i++) {
        for (let j = 0; j < this.config[0].length; j++) {
          // Finding the Neighbours of the particular cell
          const neighbours = this.FindNeighbours(i, j);

          // Applying the Rule of the present cell being 1
          if (this.config[i][j] == 1) {
            if (neighbours.indexOf(0) != -1)
              newConfig[i][j] = Math.random() <= this.p_d ? 0 : newConfig[i][j];
          }

          // Applying the Rule of the present cell being 0
          if (this.config[i][j] == 0) {
            if (neighbours.indexOf(1) != -1) {
              if (Math.random() <= this.p_h)
                newConfig[i][j] =
                  this.UtilsObject.getRandomNum(1, 10000) % 2 == 0 ? 1 : -1;
            } else
              newConfig[i][j] =
                Math.random() <= this.p_c
                  ? this.UtilsObject.getRandomNum(1, 10000) % 2 == 0
                    ? 1
                    : -1
                  : newConfig[i][j];
          }

          // Making the Newly Created Config as the Present Config
          this.config = newConfig;

          // Returning the new Config
          yield newConfig;
        }
      }
    }
  }
}
