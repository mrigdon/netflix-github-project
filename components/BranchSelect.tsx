import React from "react";
import { fetchBranches } from "../githubAPI";
import Branch from "../githubAPI/Branch";
import { RepoDetailContext } from "../utils/repoDetailContext";

export default class BranchSelect extends React.Component<{
  value: string;
  onSelect: (name: string) => void;
}> {
  static contextType = RepoDetailContext;

  state = { branches: [{ name: this.props.value }] as Branch[] };

  componentDidMount() {
    this.fetchBranches();
  }

  private async fetchBranches() {
    const { data } = await fetchBranches(
      this.context.params.org,
      this.context.params.repo
    );

    this.setState({ branches: data });
  }

  render() {
    return (
      <select
        value={this.props.value}
        onChange={(e) => this.props.onSelect(e.target.value)}
      >
        {this.state.branches.map((branch) => (
          <option key={branch.name} value={branch.name}>
            {branch.name}
          </option>
        ))}
      </select>
    );
  }
}