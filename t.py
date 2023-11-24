import ssl
import pandas as pd  
url = 'https://od.cdc.gov.tw/eic/NHI_EnteroviralInfection.csv' 
df = pd.read_csv( url) 
ssl._create_default_https_context = ssl._create_unverified_context 
print(df)