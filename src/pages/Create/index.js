import { useContext } from 'react';
import { AuthenticateContext } from '~/contexts/AuthenticateContext';

export default function Create() {
    const { account } = useContext(AuthenticateContext);
    console.log(account);
    return <div>Create</div>;
}
