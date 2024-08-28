import { Router } from 'express';
import { getAllUsers, getUserById, createUser, deleteUser, updateUser } from '../controllers/userController';


const router = Router()

router.get('/', getAllUsers)

router.get('/:id', getUserById)

router.post('/', createUser)

router.put('/:id', updateUser)

router.delete('/:id', deleteUser)



export default router;