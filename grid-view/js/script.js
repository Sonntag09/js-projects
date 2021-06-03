const dataExample = [
  {
      company: 'Alfreds <b>Futterkiste</b>',
      chef: 'Maria Anders',
      country: 'Germany'
  },
  {
      company: 'Centro comercial Montezuma',
      chef: 'Francisco Chang',
      country: 'Mexico'
  },
  {
      company: 'Ernst Handel',
      chef: 'Roland Mendel',
      country: 'Austria',
  },
  {
      company: 'Island Trading',
      chef: 'Helen Bennett',
      country: 'UK'
  },
  {
      company: 'Laughing Bacchus Winecellars',
      chef: 'Yoshi Tannamuri',
      country: 'Canada',
  }
];

const params = {
    header: 'Hello',
    headerClass: ['header'],
    element: 'body',
    attribute: {
        'company': {
            'label': 'Компания',
            'src': 'html',
        },
        'chef': {
            'label': 'Директор',
        },
        'country': {
            'label': 'Страна',
            'value': (data) => {
                if (data['country'] === 'Germany') {
                    return data['country'] + ' MAP';
                }
                return data['country'];
            }
        }
    },
    data: dataExample
};

let gridView = new GridView();

gridView.render(params);

