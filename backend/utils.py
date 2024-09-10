from googlesearch import search

def search_google(query,num_results=10, lang="en"):
    """
    returns a list of urls from google search
    input: query (str), num_results (int), lang (str)
    """
    return search(query, num_results=num_results, lang=lang)






if __name__ == "__main__":
    pass