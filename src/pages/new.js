import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { arrayMove } from 'react-sortable-hoc';
import shortId from 'short-id';
import { navigate } from 'gatsby';

import { Button } from '../styledComponents/theme';
import { Heading2 } from '../styledComponents/typography';
import NewPoll from '../components/NewPoll/index';

import Layout from '../components/layout';
import SEO from '../components/seo';

const CreateButton = Button;

const ActionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TitleContainer = styled.div`
  display: inline-flex;
  width: 350px;
  flex-direction: column;
  margin-bottom: 30px;
`;

const TitleLabel = styled.label`
  font-weight: bold;
`;

const TitleInput = styled.input`
  color: black;
  font-size: 18px;
`;

class NewPollPage extends Component {
  static contextTypes = {
    firebase: PropTypes.object,
  };

  state = {
    uid: null,
    title: '',
    options: [],
    loading: false,
  };

  // to keep track of what item is being edited

  editing = null;

  handleKeydown = e => {
    if (e.which === 27) this.handleToggleEdit(this.editing);
    if (e.which === 13) this.handleAddItem();
  };

  handleToggleEdit = id => {
    this.setState(prevState => {
      const options = prevState.options
        .filter(({ text }) => text)
        .map(option => {
          if (option.id === id) {
            if (!option.editing) {
              this.editing = id;
            } else {
              this.editing = null;
            }

            return {
              ...option,
              editing: !option.editing,
            };
          }

          return {
            ...option,
            editing: false,
          };
        });

      return {
        ...prevState,
        options,
      };
    });
  };

  handleTextChange = (e, id) => {
    const { options } = this.state;

    const Opt = options.map(option => {
      if (option.id === id) {
        return {
          ...option,
          text: e.target.value,
        };
      }

      return option;
    });

    this.setState({
      options: Opt,
    });
  };

  handleSortEnd = ({ oldIndex, newIndex }) => {
    const { options } = this.state;

    this.setState({
      options: arrayMove(options, oldIndex, newIndex),
    });
  };

  handleAddItem = () => {
    // if the user spams add w/o writing any text the items w/o any text get removed
    const { options } = this.state;

    const opt = options
      // filter out any falsy values from the list
      .filter(Boolean)
      .filter(({ text }) => text)
      .map(option => ({
        ...option,
        editing: false,
      }));

    const id = shortId.generate();
    this.editing = id;

    this.setState({
      options: [
        ...opt,
        {
          id,
          text: '',
          editing: true,
        },
      ],
    });
  };

  handleDelete = id => {
    const { options } = this.state;

    const opt = options.filter(option => option.id !== id);

    this.setState({
      options: [...opt],
    });
  };

  handleCreate = () => {
    const pollId = shortId.generate();
    const { uid } = this.state;

    this.setState({
      loading: true,
    });

    if (!uid) {
      // due to our database rules, we can't write unless a uid exists
      // signIn('anonymous').then(() => {
      //   this.createPoll(pollId);
      // });
      this.child.SignIn('anonymous').then(() => {
        this.createPoll(pollId);
      });
    } else {
      this.createPoll(pollId);
    }
  };

  handleTitleChange = e => {
    const { value } = e.target;

    this.setState({
      title: value,
    });
  };

  createPoll(pollId) {
    const { firebase } = this.context;
    const { options, title } = this.state;

    firebase.polls
      .doc(pollId)
      .set({
        title,
        id: pollId,
        options: options.map(({ text, id }) => ({ text, optionId: id })),
      })
      .then(() => {
        this.setState({
          options: [],
          loading: false,
          title: '',
        });

        navigate(`/poll/${pollId}`);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
        // TODO: notify the user of the error
      });
  }

  render() {
    const { options, loading, title } = this.state;
    const optionsWithText = options.filter(({ text }) => !!text.trim());
    const disableCreate = !title || optionsWithText.length < 2 || loading;

    return (
      <Layout>
        <SEO title="New Poll" keywords={[`gatsby`, `application`, `react`]} />
        <Heading2>Create a new Poll</Heading2>
        <TitleContainer>
          <TitleLabel htmlFor="newPollTitle">Title</TitleLabel>
          <TitleInput
            id="newPollTitle"
            value={title}
            onChange={this.handleTitleChange}
          />
        </TitleContainer>
        <NewPoll
          onRef={ref => (this.child = ref)}
          options={options}
          onToggleEdit={this.handleToggleEdit}
          onTextChange={this.handleTextChange}
          onKeyDown={this.handleKeydown}
          onSortEnd={this.handleSortEnd}
          onDelete={this.handleDelete}
        />
        <ActionContainer>
          <Button
            disabled={disableCreate}
            onClick={!disableCreate && this.handleCreate}>
            {loading ? 'Creating...' : 'Create'}
          </Button>

          <CreateButton
            disabled={loading}
            onClick={!loading && this.handleAddItem}>
            Add
          </CreateButton>
        </ActionContainer>
      </Layout>
    );
  }
}

export default NewPollPage;
