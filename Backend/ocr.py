import cv2
import easyocr
import os
import json

image = cv2.imread(filename)
reader = easyocr.Reader(['en'])
results = reader.readtext(image)
print(results)
result_text = os.path.join(os.getcwd(),'result_text.te')
output = {'text':[]}
for result in results:
  output['text'].append(result[1])
with open('output_text.json','w') as outputfile:
  json.dump(output,outputfile)
print(f"file saved @ {os.path.join(os.getcwd(),'output_text.json')}")