/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultItemsNavigations: FuseNavigationItem[] = [
    {
        id   : 'empresa',
        title: 'Empresa',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/empresa'
    },
    {
        id: 'solicitudes',
        title: 'Solicitudes',
        type: 'group',
        children: [
            {
                id: 'registrar-solicitud',
                title: 'Registrar solicitud',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/solicitud/registrar-solicitud'
            },
        ]
    },
    {
        id   : 'rrhh',
        title: 'R.R.H.H.',
        type : 'group',
        children: [
            {
                id   : 'admision',
                title: 'Admisión',
                type : 'collapsable',
                icon : 'heroicons_outline:chart-pie',
                link : '/recursos-humanos/admision',
                children: [
                    {
                        id: 'postulaciones',
                        title: 'Postulaciones',
                        type: 'basic',
                        icon: 'heroicons_outline:chart-pie',
                        link: '/recursos-humanos/admision/postulaciones'
                    },
                    {
                        id: 'ofertas',
                        title: 'Ofertas',
                        type: 'basic',
                        icon: 'heroicons_outline:chart-pie',
                        link: '/recursos-humanos/admision/ofertas'
                    },
                    {
                        id: 'entrevistas',
                        title: 'Entrevistas',
                        type: 'basic',
                        icon: 'heroicons_outline:chart-pie',
                        link: '/recursos-humanos/admision/entrevistas'
                    },
                    {
                        id: 'examen-medico',
                        title: 'Examen médico',
                        type: 'basic',
                        icon: 'heroicons_outline:chart-pie',
                        link: '/recursos-humanos/admision/examen-medico'
                    },
                    {
                        id: 'evaluaciones',
                        title: 'Evaluaciones',
                        type: 'basic',
                        icon: 'heroicons_outline:chart-pie',
                        link: '/recursos-humanos/admision/evaluaciones'
                    },
                ]
            },
            {
                id   : 'personal',
                title: 'Personal',
                type : 'basic',
                icon : 'heroicons_outline:chart-pie',
                link : '/recursos-humanos/personal',
            },
        ]
    }
];

export const defaultNavigation: FuseNavigationItem[] = [...defaultItemsNavigations];
export const compactNavigation: FuseNavigationItem[] = [...defaultItemsNavigations];
export const futuristicNavigation: FuseNavigationItem[] = [...defaultItemsNavigations];
export const horizontalNavigation: FuseNavigationItem[] = [...defaultItemsNavigations];
