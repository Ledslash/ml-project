import Image from 'next/image'
import { Inter } from '@next/font/google'

import { UserInfo } from '@/shared/interaces';

import profileStyles from '../styles/profile.module.css';
import xIcon from '../assets/xicon.png';

import { config } from '../config/config';

const inter = Inter({ subsets: ['latin'] })


interface Props {
    user: UserInfo;
    error?: string;
}

export default function Profile({ user, error }: Props) {

    if(error){
        throw new Error(error);
    }

    const hasRestrictionWarning = user.restrictionData[0].tipo === 'warning';
    return (
        <section className={profileStyles.mainBody}>
            <Image 
                src={user.imagen}
                alt="Profile Image"
                className={profileStyles.profileImage}
                width="180"
                height="180"
                priority />
            <div className={profileStyles.profileInfo}>
                <h2>Hola, {user.nombre} {user.apellido}</h2>
                <p>{user.levelData.descripción}</p>
                { hasRestrictionWarning &&
                    <div className={profileStyles.accountWarning}>
                        <i className={profileStyles.icoX}><Image src={xIcon} alt="warning" className={profileStyles.xIcon} priority /></i>
                        <p className={profileStyles.warningMessage}>Tu cuenta no ha sido verificada aún. Revisa tu mail</p>
                    </div>
                }
            </div>
        </section>
    )
}

export async function getServerSideProps() {
    try{
        const SSR_HOST = config.default.BACKEND.SSR_HOST;
        const PORT = config.default.BACKEND.PORT;
        const PROFILE_PATH = config.default.BACKEND.SERVICE_PATHS.PROFILE;

        const res = await fetch(`${SSR_HOST}:${PORT}/${PROFILE_PATH}`);
        const user = await res.json()
        return { props: { user } }
    } catch (e: any){
        return { props: {error: e.message} }
    }
}