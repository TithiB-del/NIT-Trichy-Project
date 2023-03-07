import json

import matplotlib.pyplot as plt

def get_json_data():
    with open('res.json','r') as fp:
        jsonContent = fp.read()
    y = json.loads(jsonContent)

    return y

def plot_graph(x,y,label):
    plt.plot(x,y,label=label,linewidth = 2,markersize = 16)

# 2 1
if __name__ == '__main__':
    d= get_json_data()
    gen_array = [i for i in range(0,200001,50)]
    print(len(gen_array))
    print(len(d[4]['values']))
    plot_graph(gen_array,d[4]['values'],f'p_h = {d[4]["p_h"]}')
    plot_graph(gen_array,d[3]['values'],f'p_h = {d[3]["p_h"]}')
    plot_graph(gen_array,d[2]['values'],f'p_h = {d[2]["p_h"]}')
    plot_graph(gen_array,d[1]['values'],f'p_h = {d[1]["p_h"]}')
    plot_graph(gen_array,d[1]['values'],f'p_h = {d[1]["p_h"]}')

    plt.xlabel('Number of Generations')
    plt.ylabel('Number of Active Traders')

    plt.title("2 Local and 2 Global Neighbours")
    plt.legend()
    plt.savefig(f'graph.png',dpi=300)

    plt.show()
