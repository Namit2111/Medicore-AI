from utils import utils
l = []
res = utils.llm_query(query="I have stomach ache since noon, I just ate some burger")
# print(res)

weight = utils.calculate_keyword_weights(res["keywords"])
google_res = utils.search_google(res["query"], num_results=15, advanced=True)

rated_links = []

for result in google_res:
    r = utils.rate_text_based_on_keywords(text=result.description, keyword_weights=weight)
    # print(res.description + " its rating is " + str(r))
    
    rated_links.append((result.url, r))


rated_links.sort(key=lambda x: x[1], reverse=True)

non_zero_links = [link for link in rated_links if link[1] > 0]

if len(non_zero_links) >= 2:
    l = non_zero_links[:3]

webtxt = ""
for link, rating in l:
    print(f"Link: {link} | Rating: {rating:.2f}")
    webtxt = webtxt + utils.extract_text_from_website(url=link)

print( utils.chat_bot(query= f"answer the user query based on context be precise query:{res['query']} context:{webtxt}"))

# ---------------------------------------------------------------------


# sample decorator
# def dec(fun):
#     def doo(*args,**kwargs):
#         print("inside dec")
#         res = fun()
#         print("outside dec")
#         return res
#     return doo

# @dec
# def fun():
#     print("inside fun")
#     return "hello"

# print(fun())
