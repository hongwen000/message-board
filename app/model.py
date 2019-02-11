# -*- coding: utf-8 -*-

import shelve
import pprint
from collections import OrderedDict

DATA_FILE = 'guestbook.dat'

def load_data():
    """
    load saved data
    """
    database = shelve.open(DATA_FILE)
    data = database.get('greeting_dict', OrderedDict())
    database.close()
    data = reversed(data.items())
    greeting_dict = []
    for _, value in data:
        greeting_dict.append(value)
    return greeting_dict

    
def save_data(name, comment, create_at):
    """
    save data from form submitted
    """
    database = shelve.open(DATA_FILE)

    if 'greeting_dict' not in database:
        greeting_dict = OrderedDict()
        max_key = 0
    else:
        greeting_dict = database['greeting_dict']
        max_key = max(greeting_dict.keys())
    print("Max key is ", max_key)
    greeting_dict[max_key + 1] = {'id': max_key + 1, 'name': name, 'comment': comment, 'create_at': create_at}
    # pp = pprint.PrettyPrinter(indent=4)
    # pp.pprint(comment)
        
    database['greeting_dict'] = greeting_dict
    database.close()

def del_data(msg_id):
    """
    delete specified msg
    """
    database = shelve.open(DATA_FILE)
    if 'greeting_dict' not in database:
        return False
    data = database['greeting_dict']
    if msg_id not in data:
        return False
    del data[msg_id]
    database['greeting_dict'] = data
    database.close()
    return True