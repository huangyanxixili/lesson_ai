import requests
from bs4 import BeautifulSoup

def get_zhihu_hot():
    url = 'https://www.zhihu.com/hot'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        hot_items = soup.select('.HotItem-title')
        
        print('知乎热榜前10：\n')
        for i, item in enumerate(hot_items[:10], 1):
            title = item.text.strip()
            print(f'{i}. {title}')
            
    except Exception as e:
        print(f'抓取失败: {e}')

if __name__ == '__main__':
    get_zhihu_hot()
