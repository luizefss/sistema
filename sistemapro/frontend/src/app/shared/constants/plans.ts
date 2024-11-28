import { Plan } from '../interfaces/plans.interface';

export const plans: Plan[] = [
  {
    id: 1,
    name: 'Basic',
    price: 29.99,
    features: ['Feature 1', 'Feature 2', 'Feature 3']
  },
  {
    id: 2,
    name: 'Premium',
    price: 49.99,
    features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4']
  },
  {
    id: 3,
    name: 'Enterprise',
    price: 99.99,
    features: ['All features']
  }
];
