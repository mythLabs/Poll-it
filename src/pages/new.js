import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'gatsby-link';
import { arrayMove } from 'react-sortable-hoc';
import shortId from 'short-id';

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

class NewPollPage extends Component {
  state = {
    options: [
      {
        text: 'Angular',
        id: '123avcs232',
        editing: false,
      },
      {
        text: 'React',
        id: '123av35df2',
        editing: false,
      },
      {
        text: 'Vue',
        id: '12323dsdsv35df2',
        editing: false,
      },
      {
        text: 'Ember',
        id: 'ac24312v35df2',
        editing: false,
      },
    ],
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

  render() {
    const { options } = this.state;

    return (
      <Layout>
        <SEO title="New Poll" keywords={[`gatsby`, `application`, `react`]} />
        <Heading2>Create a new Poll</Heading2>
        <NewPoll
          options={options}
          onToggleEdit={this.handleToggleEdit}
          onTextChange={this.handleTextChange}
          onKeyDown={this.handleKeydown}
          onSortEnd={this.handleSortEnd}
          onDelete={this.handleDelete}
        />
        <ActionContainer>
          <Link to="/new">
            <Button>Create</Button>
          </Link>
          <CreateButton onClick={this.handleAddItem}>Add</CreateButton>
        </ActionContainer>
      </Layout>
    );
  }
}

export default NewPollPage;
