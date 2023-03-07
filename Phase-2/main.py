import json

import matplotlib.pyplot as plt

# Reading JSON Data
def get_json_data():
    with open('res.json','r') as fp:
        jsonContent = fp.read()
    y = json.loads(jsonContent)

    return y


# Plotting the Graph
def plot_graph(x,y,label):
    plt.plot(x,y,label=label,linewidth = 2,markersize = 16)

# Drawing the Graph for the different Values of p_h using the values generated and collected in res.json
if __name__ == '__main__':
    d= get_json_data()
    gen_array = [i for i in range(0,40001,50)]

    plot_graph(gen_array,d[4]['values'],f'p_h = {d[4]["p_h"]}')
    plot_graph(gen_array,d[3]['values'],f'p_h = {d[3]["p_h"]}')
    plot_graph(gen_array,d[2]['values'],f'p_h = {d[2]["p_h"]}')
    plot_graph(gen_array,d[1]['values'],f'p_h = {d[1]["p_h"]}')

    plt.xlabel('Number of Generations')
    plt.ylabel('Number of Active Traders')

    plt.legend()
    # plt.savefig(f'{d[1]["p_h"]}.png',dpi=300)
    plt.savefig(f'graph.png',dpi=300)

    plt.show()
