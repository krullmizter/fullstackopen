import React, { useState, useMemo } from "react";
import { View, FlatList, TextInput, Pressable, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-native";
import RepoItem from "./RepoItem";
import useRepositories from "../hooks/useRepositories";
import theme, { formStyles } from "./theme";

const styles = StyleSheet.create({
  separator: {
    height: 15,
  },
  searchInput: {
    ...formStyles.input,
    marginHorizontal: theme.padding.medium,
  },
  picker: {
    marginHorizontal: theme.padding.medium,
    padding: theme.padding.small,
    backgroundColor: theme.colors.white,
    borderRadius: 5,
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    marginBottom: theme.padding.small,
  },
  headerContainer: {
    paddingTop: theme.padding.medium,
    paddingBottom: theme.padding.medium,
    backgroundColor: theme.colors.backgroundLight,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepoList = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortBy, setSortBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
  const navigate = useNavigate();

  const { repositories, loading } = useRepositories(
    sortBy,
    orderDirection,
    debouncedSearchKeyword
  );

  const handleRepoPress = (id) => {
    navigate(`/repository/${id}`);
  };

  const renderHeader = useMemo(
    () => (
      <View style={styles.headerContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Repositories"
          value={searchKeyword}
          onChangeText={setSearchKeyword}
        />
        <Picker
          selectedValue={`${sortBy},${orderDirection}`}
          onValueChange={(value) => {
            const [newSortBy, newOrderDirection] = value.split(",");
            setSortBy(newSortBy);
            setOrderDirection(newOrderDirection);
          }}
          style={styles.picker}
        >
          <Picker.Item label="Latest repositories" value="CREATED_AT,DESC" />
          <Picker.Item
            label="Highest rated repositories"
            value="RATING_AVERAGE,DESC"
          />
          <Picker.Item
            label="Lowest rated repositories"
            value="RATING_AVERAGE,ASC"
          />
        </Picker>
      </View>
    ),
    [searchKeyword, sortBy, orderDirection]
  );

  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={renderHeader}
      renderItem={({ item }) => (
        <Pressable onPress={() => handleRepoPress(item.id)}>
          <RepoItem repository={item} />
        </Pressable>
      )}
      contentContainerStyle={{
        paddingBottom: theme.padding.large,
      }}
    />
  );
};

export default RepoList;
