# -*- coding: utf-8 -*-

import shelve
import pprint

DATA_FILE = 'guestbook.dat'

def load_data():
    """
    load saved data
    """
    database = shelve.open(DATA_FILE)
    greeting_list = database.get('greeting_list', [])
    database.close()
    return greeting_list

    
def save_data(name, comment, create_at):
    """
    save data from form submitted
    """
    database = shelve.open(DATA_FILE)

    if 'greeting_list' not in database:
        greeting_list = []
    else:
        greeting_list = database['greeting_list']

    greeting_list.insert(
        0, {'name': name, 'comment': comment, 'create_at': create_at})
    # pp = pprint.PrettyPrinter(indent=4)
    # pp.pprint(comment)
        
    database['greeting_list'] = greeting_list
    database.close()
