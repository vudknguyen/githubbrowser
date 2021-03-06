import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  Image,
  StyleSheet,
} from 'react-native';

import AuthService from '../services/AuthService';
import moment from 'moment';

export default class PushPayload extends Component {
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: ds.cloneWithRows(props.pushEvent.payload.commits),
      pushEvent: props.pushEvent,
    };
  }

  renderRow(rowData) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'flex-start',
        
        borderColor: '#D7D7D7',
        borderBottomWidth: 1,
        paddingTop: 20,
        paddingBottom: 20,
        padding: 10,
      }}>
        <Text><Text style={styles.bold}>{rowData.sha.substring(0, 6) }</Text> - {rowData.message}</Text>
      </View>
    )
  }

  render() {
    return (<View style={{
      flex: 1,
      paddingTop: 80,
      justifyContent: 'flex-start',
      alignItems: 'center',

    }}>
      <Image
        source={{ uri: this.state.pushEvent.actor.avatar_url }}
        style={{
          height: 120,
          width: 120,
          borderRadius: 60,
        }}/>

      <Text style={{
        paddingTop: 20,
        paddingBottom: 20,
        fontSize: 20,
      }}>
        {moment(this.state.pushEvent.created_at).fromNow() }
      </Text>
      <Text>
      <Text style={styles.bold}>
        {this.state.pushEvent.actor.login}
      </Text> pushed to
      </Text>
      <Text style={styles.bold}>
        {this.state.pushEvent.payload.ref.replace('refs/heads/', '') }
      </Text>
      <Text>
        at <Text style={styles.bold}>{this.state.pushEvent.repo.name}</Text>
      </Text>
      <Text style={{
        paddingTop: 40,
        fontSize: 20,
      }}>
        {this.state.pushEvent.payload.commits.length} Commits
      </Text>

      <ListView style={{
        alignSelf: 'stretch',
      }}
        contentInset={{
          top: -50
        }}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this) } />
    </View>);
  }
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: '800',
    fontSize: 16,
  }
});
