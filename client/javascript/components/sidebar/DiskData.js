import {formatMessage,FormattedMessage, injectIntl} from 'react-intl';
import EventTypes from '../../constants/EventTypes';
import ServerDataStore from '../../stores/ServerStore';
import React from 'react';

class DiskStats extends React.Component {

    componentWillMount(){
        ServerDataStore.fetchDiskStats();
    }

    bytesToSize(bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }

    render() {
        const stats = ServerDataStore.getDiskStats();
        if(stats.length > 0){
            let mappedData = stats.map((diskStat) => {
                const free = this.bytesToSize(diskStat.details.available);
                const volName = diskStat.mountPoint;
                return (
                        <li key={volName} className="sidebar-filter__item">
                        <div> [{ free }] { volName }  </div>
                        {this.props.children}
                    </li>
                );
            });
            return (
                    <ul className="sidebar-filter sidebar__item">
                    <li className="sidebar-filter__item sidebar-filter__item--heading">
                    <FormattedMessage
                    id="diskstats.title"
                    defaultMessage="Disk Usage"
                    />
                    </li>
                    { mappedData } </ul>);
        };
        return null;
    }
}

export default injectIntl(DiskStats);
