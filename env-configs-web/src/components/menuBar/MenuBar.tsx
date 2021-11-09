import * as React from 'react';
import { useEffect, useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ListIcon from '@mui/icons-material/List';
import { useActions } from '../../redux/hooks/useActions';
import { fetchProjectConfigs } from '../../redux/actions/configsActions';
import { ConfigType } from '../../types/types';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';

const MenuBar = () => {
    const { fetchGlobalConfigs, fetchProjectConfigs, openMenu } = useActions();

    useEffect(() => {
        fetchGlobalConfigs();
    }, [fetchGlobalConfigs]);

    const [isHidden, setIsHidden] = useState(false);
    const [menuWidth, setMenuWidth] = useState(360);

    const hideMenu = () => {
        setMenuWidth(!isHidden ? 60 : 360);
        setIsHidden(!isHidden);
    };

    return (
        <List
            sx={{ width: '100%', maxWidth: menuWidth }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <div className="menu-sub-header">
                    <ListSubheader
                        hidden={isHidden}
                        component="div"
                        id="nested-list-subheader"
                        sx={{ backgroundColor: '#fafafa' }}
                    >
                        Environment Configs
                    </ListSubheader>
                    {isHidden ? (
                        <ListIcon
                            color={'info'}
                            onClick={() => hideMenu()}
                            fontSize="large"
                            sx={{
                                cursor: 'pointer',
                            }}
                        />
                    ) : (
                        <MenuIcon
                            color={'info'}
                            onClick={() => hideMenu()}
                            sx={{ cursor: 'pointer', marginRight: '10px' }}
                        />
                    )}
                </div>
            }
        >
            <ListItemButton
                onClick={() => {
                    openMenu({
                        name: 'Global',
                        type: ConfigType.GLOBAL,
                        isTableContent: true,
                    });
                }}
            >
                <ListItemText primary="Global" hidden={isHidden} />
                <SettingsEthernetIcon color={'primary'} />
            </ListItemButton>
            <ListItemButton
                onClick={() => {
                    fetchProjectConfigs();
                }}
            >
                <ListItemText primary="Projects" hidden={isHidden} />
                <SettingsEthernetIcon color={'secondary'} />
            </ListItemButton>
            <ListItemButton onClick={() => {}} disabled={true}>
                <ListItemText primary="Deployments" hidden={isHidden} />
                <SettingsEthernetIcon color={'error'} />
            </ListItemButton>
            <ListItemButton onClick={() => {}} disabled={true}>
                <ListItemText primary="Releases" hidden={isHidden} />
                <SettingsEthernetIcon color={'success'} />
            </ListItemButton>
        </List>
    );
};

export default MenuBar;