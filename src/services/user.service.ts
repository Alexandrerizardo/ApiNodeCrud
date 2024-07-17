import { User } from "../models/users";
import { userRepository } from "../repositories/user.repository";
import { validateNumber } from "./util";

const insertUser = async (user: Omit<User, 'id'>): Promise<void> => {
    try {
        validateUser(user);
        await userRepository.insertUser(user);
    } catch (err) {
        throw new Error("Ocorreu um erro ao inserir os dados no banco de dados. Erro: " + err);
    }
};

const getUser = async (): Promise<User[]> => {
    try {
        return await userRepository.listUsers();
    } catch (err) {
        throw new Error("Ocorreu um erro ao selecionar dados de usuários no banco de dados. Erro: " + err);
    }
};

const getUserById = async (id: number): Promise<User | undefined> => {
    try {
        if(!validateNumber(id)){
            throw new Error('id inválido!');
        }
            return await userRepository.getUsersById(id); 
    } catch (err) {
        throw new Error("Ocorreu um erro ao buscar o ID de usuário. Erro: " + err);
    }
};

const deleteUser = async (id: number): Promise<void> => {
    try {
        const userSaved = await userRepository.getUsersById(id)
        await userRepository.deleteUser(id);
        if(!validateNumber(id)){
            throw new Error('id inválido!');
        }
        if(!userSaved){
            throw new Error("Usuário não encontrado")
        }   
    } catch (err) {
        throw new Error("Ocorreu um erro ao deletar usuário.  " + err);
    }
};

const updateUser = async (id: number, user: Omit<User, 'id'>): Promise<void> => {
    try {
        validateUser(user);
        const userSaved = userRepository.getUsersById(id);
        if(!userSaved){
            throw new Error("Usuário não encontrado")
        }  
        await userRepository.updateUser(id, user);
    } catch (err) {
        throw new Error("Ocorreu um erro ao atualizar o usuário no banco de dados. Erro: " + err);
    }
};

const validateUser = (user: Omit<User, 'id'>): void => {
    if (!user) throw new Error("Usuário inválido");
    if (!user.nome) throw new Error("Informe o nome de usuário");
    if (!user.sobrenome) throw new Error("Informe o sobrenome de usuário");
    if (!user.np) throw new Error("Informe o Número Pessoal de usuário");
    if (!user.senha) throw new Error("Informe a senha de usuário");
    if (!user.senhaConfirm) throw new Error("Informe a confirmação de senha");
    if (user.senhaConfirm !== user.senha) throw new Error("A confirmação de senha precisa ser igual à senha definida");
};

export const userService ={
   insertUser,
   getUser,
   getUserById,
   deleteUser,
   updateUser, 
}
