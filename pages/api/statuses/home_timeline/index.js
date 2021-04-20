const timeline = [
  {
    id: 0,
    username: 'Zimitarra',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdMqiW8IoCTXt_buizcguz9gMGu1bStd3MwA&usqp=CAU',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    id: 1,
    username: 'Borderland',
    avatar:
      'https://image.freepik.com/vector-gratis/chica-escuchando-musica-auriculares-portatil-cartoon-icon-illustration-concepto-icono-musica-personas-aislado-estilo-dibujos-animados-plana_138676-1722.jpg',
    message: 'Hello everybody!!!!!!!'
  },
  {
    id: 2,
    username: 'Zimitarra',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdMqiW8IoCTXt_buizcguz9gMGu1bStd3MwA&usqp=CAU',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    id: 3,
    username: 'Borderland',
    avatar:
      'https://image.freepik.com/vector-gratis/chica-escuchando-musica-auriculares-portatil-cartoon-icon-illustration-concepto-icono-musica-personas-aislado-estilo-dibujos-animados-plana_138676-1722.jpg',
    message: 'Hello everybody!!!!!!!'
  },
  {
    id: 4,
    username: 'Zimitarra',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdMqiW8IoCTXt_buizcguz9gMGu1bStd3MwA&usqp=CAU',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    id: 5,
    username: 'Borderland',
    avatar:
      'https://image.freepik.com/vector-gratis/chica-escuchando-musica-auriculares-portatil-cartoon-icon-illustration-concepto-icono-musica-personas-aislado-estilo-dibujos-animados-plana_138676-1722.jpg',
    message: 'Hello everybody!!!!!!!'
  },
  {
    id: 6,
    username: 'Zimitarra',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdMqiW8IoCTXt_buizcguz9gMGu1bStd3MwA&usqp=CAU',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    id: 7,
    username: 'Borderland',
    avatar:
      'https://image.freepik.com/vector-gratis/chica-escuchando-musica-auriculares-portatil-cartoon-icon-illustration-concepto-icono-musica-personas-aislado-estilo-dibujos-animados-plana_138676-1722.jpg',
    message: 'Hello everybody!!!!!!!'
  }
]

export default (req, res) => {
  res.status(200)
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(timeline))
}
