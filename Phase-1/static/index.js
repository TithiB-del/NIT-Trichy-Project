const ip_form = document.getElementsByClassName("ip_controls")[0];
const canvas_area = document.getElementsByClassName('simulation-field')[0];

const p_c = document.getElementById('p_c');
const p_d = document.getElementById('p_d');
const p_h = document.getElementById('p_h');

const row = document.getElementById('row');
const col = document.getElementById('col');

let setIntervalId = null;


const checkFloat = (e) => {
    const permissible = ['0','1','2','3','4','5','6','7','8','9','.']
    const value = e.target.value;
    
    for(i of value){
        if(permissible.indexOf(i) == -1)
            {
                e.target.value = e.target.value.slice(0,-1);
                break;
            }
    }

    if(parseFloat(value) > 1.0 || parseFloat(value) < 0.0){
        e.target.value = e.target.value.slice(0,-1);
    }
}

const countActive = (grid) => {

    let count = 0;

    for(let i = 0;i < grid.length;i++){
        for(let j = 0;j<grid[0].length;j++){
            if(grid[i][j])
                count += 1
        }
    }

    return count;
}

const checkInt = (e) => {
    const permissible = ['0','1','2','3','4','5','6','7','8','9']
    const value = e.target.value;

    for(i of value){
        if(permissible.indexOf(i) == -1)
            {
                e.target.value = e.target.value.slice(0,-1);
                break;
            }
    }
}


p_c.addEventListener('input',checkFloat);
p_d.addEventListener('input',checkFloat);
p_h.addEventListener('input',checkFloat);

row.addEventListener('input',checkInt);
col.addEventListener('input',checkInt);

const validateForm = () => p_c.value && p_d.value && p_h.value && row.value && col.value;


const drawOnScreen = (mat) => {

    canvas_area.width = 500;
    canvas_area.height = canvas_area.width * (mat.length/mat[0].length);

    const units = {
        y: canvas_area.width/mat[0].length,
        x: canvas_area.height/mat.length
    }


    const ctx = canvas_area.getContext('2d');

    for(let i = 0;i<mat.length;i++){

        for(let j = 0;j<mat[0].length;j++){

            ctx.fillStyle = mat[i][j] == 0 ? '#161616' : (mat[i][j] == 1 ? '#cefdcb' : '#efabbb');
            const x = j * units.x,
                  y = i * units.y,
                  w = units.x,
                  h = units.y;

            ctx.fillRect(x, y, w, h);
        }

    }
}


ip_form.addEventListener('submit',(e) => {

    clearInterval(setIntervalId);
    
    e.preventDefault();

    
    const row = ip_form.RowCnt.value;
    const col =  ip_form.ColCnt.value;

    const p_d = ip_form.P_D.value;
    const p_h = ip_form.P_H.value;
    const p_c = ip_form.P_C.value;


    if(validateForm()){
        const smde_1 = new Stock_Market_Dynamics_Emulator([row, col], p_d, p_h, p_c);
        const gen_func = smde_1.simulate();

        console.log(countActive(smde_1.config));

       setIntervalId = setInterval(() => {
            drawOnScreen(gen_func.next().value)
        },2)

    }

    else{
        return alert("Please Fill all the Necessary Fields for the Simulation");
    }

})
