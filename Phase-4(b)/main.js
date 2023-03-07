import fs from 'fs';

import { Stock_Market_Dynamics_Emulator as model} from './model.js'



const p_d = 0.05
const p_c = 0.0001

const p_h = [0.0493,0.0490,0.0488,0.0485,0.0475]

// Original = 10000
const gen_count = 200000
const gen_gap = 50

// Original = [512,128]
const dimensions = [512,128];

const check_active_states = (grid) => {

    let count = 0;

    for(let i = 0;i < grid.length;i++){
        for(let j = 0;j<grid[0].length;j++){
            if(grid[i][j])
                count += 1
        }
    }

    return count;
}


(() => {

    let master_array = [];


    for(let i = 0;i<p_h.length;i++){
        let values = [];
        let o1 = new model(dimensions,p_d,p_h[i],p_c);


        let simulator = o1.simulate();

        for(let j = 0;j<=gen_count;j++){
           let grid =  simulator.next().value;

           if(j % gen_gap == 0){
            values.push(check_active_states(grid));
           }
           
        }

        master_array.push({
            p_h : p_h[i],
            values: values
        });
    }

    fs.writeFileSync('./static/res.json',JSON.stringify(master_array));
})()