import { create, router as _router, defaults, bodyParser } from 'json-server';

const server = create();
const router = _router('db.json');
const middlewares = defaults();

server.use(middlewares);
server.use(bodyParser);

// Custom middleware for signup
server.post('/signup', (req, res) => {
  const { name, avatar, email, password } = req.body;
  
  // Check if user already exists
  const users = router.db.get('users').value();
  const existingUser = users.find(user => user.email === email);
  
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create new user
  const newUser = {
    id: Date.now().toString(),
    name,
    avatar,
    email,
    password
  };

  // Add to users collection
  router.db.get('users').push(newUser).write();

  // Return success response
  res.status(201).json({
    data: {
      name: newUser.name,
      avatar: newUser.avatar,
      email: newUser.email,
      _id: newUser.id
    }
  });
});

// Custom middleware for signin
server.post('/signin', (req, res) => {
  const { email, password } = req.body;
  
  // Find user
  const users = router.db.get('users').value();
  const user = users.find(user => user.email === email && user.password === password);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Return success response with token
  res.json({
    token: 'mock-jwt-token',
    user: {
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      _id: user.id
    }
  });
});

server.use(router);
server.listen(3001, () => {
  console.log('JSON Server is running on port 3001');
}); 