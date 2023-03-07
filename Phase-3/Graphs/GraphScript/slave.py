import json

import matplotlib.pyplot as plt

def get_json_data(filename):
    with open(f'..\..\Results\{filename}','r') as fp:
        jsonContent = fp.read()
    y = json.loads(jsonContent)

    return y

def plot_graph(x,y,label):
    plt.plot(x,y,label=label,linewidth = 2,markersize = 16)


def plot(k,l):
    d= get_json_data(f'{k}_{l}.json')
    gen_array = [i for i in range(0,40001,50)]
    print(len(gen_array))
    print(len(d[4]['values']))
    plot_graph(gen_array,d[4]['values'],f'p_h = {d[4]["p_h"]}')
    plot_graph(gen_array,d[3]['values'],f'p_h = {d[3]["p_h"]}')
    plot_graph(gen_array,d[2]['values'],f'p_h = {d[2]["p_h"]}')
    plot_graph(gen_array,d[1]['values'],f'p_h = {d[1]["p_h"]}')
    plot_graph(gen_array,d[1]['values'],f'p_h = {d[1]["p_h"]}')

    plt.legend()

    plt.xlabel('Number of Generations')
    plt.ylabel('Number of Active Traders')
    plt.title(f'k = {k} and l = {l}')

    plt.savefig(f'{k}_{l}.png',dpi=300)

    plt.show()