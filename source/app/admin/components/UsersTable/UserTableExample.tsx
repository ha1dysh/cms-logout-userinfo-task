import {
  ChoiceList,
  IndexFilters,
  IndexFiltersProps,
  IndexTable,
  LegacyCard,
  RangeSlider,
  TabProps,
  Text,
  TextField,
  useBreakpoints,
  useIndexResourceState,
  useSetIndexFiltersMode
} from '@shopify/polaris';
import { useCallback, useState, useEffect, } from 'react';
import { TUserDto } from '~/.server/admin/dto/user.dto';
import { useSearchParams } from "@remix-run/react";

// JS -> SearchParams
// ARRAY[1,2,3] -> 1,2,3
// OBJECT {key: value} -> key=value


export function IndexTableWithViewsSearchFilterSorting({users}: {users: TUserDto[]}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryValue, setQueryValue] = useState(() => searchParams.get("q") ?? "");
  const [sort, setSort] = useState(() => ({
    prop: searchParams.get("sortProp") ?? "",
    type: searchParams.get("sortType") ?? "",
  }));

  useEffect(()=> {
    setSearchParams({
      q: queryValue,
      sortProp: sort.prop,
      sortType: sort.type
    })
  }, [setSearchParams, queryValue, sort])


  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
  /* VIEWS START */
  const [itemStrings, setItemStrings] = useState([
    'All',
    // 'Unpaid',
    // 'Open',
    // 'Closed',
    // 'Local delivery',
    // 'Local pickup',
  ]);
  const deleteView = (index: number) => {
    const newItemStrings = [...itemStrings];
    newItemStrings.splice(index, 1);
    setItemStrings(newItemStrings);
    setSelected(0);
  };
  const duplicateView = async (name: string) => {
    setItemStrings([...itemStrings, name]);
    setSelected(itemStrings.length);
    await sleep(1);
    return true;
  };
  const tabs: TabProps[] = itemStrings.map((item, index) => ({
    content: item,
    index,
    onAction: () => {
      if (item === 'All') {
        return setQueryValue('')
      }
      setQueryValue(item)
    },
    id: `${item}-${index}`,
    isLocked: index === 0,
    actions:
      index === 0
        ? []
        : [
            {
              type: "rename",
              onAction: () => {},
              onPrimaryAction: async (value: string): Promise<boolean> => {
                const newItemsStrings = tabs.map((item, idx) => {
                  if (idx === index) {
                    return value;
                  }
                  return item.content;
                });
                await sleep(1);
                setItemStrings(newItemsStrings);
                return true;
              },
            },
            {
              type: "duplicate",
              onPrimaryAction: async (value: string): Promise<boolean> => {
                await sleep(1);
                duplicateView(value);
                return true;
              },
            },
            {
              type: "edit",
            },
            {
              type: "delete",
              onPrimaryAction: async () => {
                await sleep(1);
                deleteView(index);
                return true;
              },
            },
          ],
  }));
  const [selected, setSelected] = useState(0);
  const onCreateNewView = async (value: string) => {
    await sleep(500);
    setItemStrings([...itemStrings, value]);
    setSelected(itemStrings.length);
    return true;
  };
  /* VIEWS END */

  /* SORT START */
  const sortOptions: IndexFiltersProps['sortOptions'] = [
    { label: 'Full Name', value: 'fullName asc', directionLabel: 'Ascending' },
    { label: 'Full Name', value: 'fullName desc', directionLabel: 'Descending' },
    { label: 'Email', value: 'email asc', directionLabel: 'A-Z' },
    { label: 'Email', value: 'email desc', directionLabel: 'Z-A' },
    { label: 'Role', value: 'role asc', directionLabel: 'A-Z' },
    { label: 'Role', value: 'role desc', directionLabel: 'Z-A' },
    { label: 'Created At', value: 'createdAt asc', directionLabel: 'Ascending' },
    { label: 'Created At', value: 'createdAt desc', directionLabel: 'Descending' },
  ];
  const [sortSelected, setSortSelected] = useState(['fullName asc']);
  /* SORT END */

  /* FILTERS START */
  const { mode, setMode } = useSetIndexFiltersMode();
  const onHandleCancel = () => {
  };
  const onHandleSave = async () => {
    await sleep(1);
    return true;
  };
  const primaryAction: IndexFiltersProps['primaryAction'] =
    selected === 0
      ? {
        type: 'save-as',
        onAction: onCreateNewView,
        disabled: false,
        loading: false,
      }
      : {
        type: 'save',
        onAction: onHandleSave,
        disabled: false,
        loading: false,
      };
  const [accountStatus, setAccountStatus] = useState<string[] | undefined>(
    undefined,
  );
  const [moneySpent, setMoneySpent] = useState<[number, number] | undefined>(
    undefined,
  );
  const [taggedWith, setTaggedWith] = useState('');

  const handleAccountStatusChange = useCallback(
    (value: string[]) => setAccountStatus(value),
    [],
  );
  const handleMoneySpentChange = useCallback(
    (value: [number, number]) => setMoneySpent(value),
    [],
  );
  const handleTaggedWithChange = useCallback(
    (value: string) => setTaggedWith(value),
    [],
  );
  const handleFiltersQueryChange = useCallback(
    (value: string) => setQueryValue(value),
    [],
  );
  const handleAccountStatusRemove = useCallback(
    () => setAccountStatus(undefined),
    [],
  );
  const handleMoneySpentRemove = useCallback(
    () => setMoneySpent(undefined),
    [],
  );
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(''), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(''), []);
  const handleFiltersClearAll = useCallback(() => {
    handleAccountStatusRemove();
    handleMoneySpentRemove();
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [
    handleAccountStatusRemove,
    handleMoneySpentRemove,
    handleQueryValueRemove,
    handleTaggedWithRemove,
  ]);

  const filters = [
    {
      key: 'accountStatus',
      label: 'Account status',
      filter: (
        <ChoiceList
          title="Account status"
          titleHidden
          choices={[
            { label: 'Enabled', value: 'enabled' },
            { label: 'Not invited', value: 'not invited' },
            { label: 'Invited', value: 'invited' },
            { label: 'Declined', value: 'declined' },
          ]}
          selected={accountStatus || []}
          onChange={handleAccountStatusChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
    {
      key: 'taggedWith',
      label: 'Tagged with',
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={handleTaggedWithChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },
    {
      key: 'moneySpent',
      label: 'Money spent',
      filter: (
        <RangeSlider
          label="Money spent is between"
          labelHidden
          value={moneySpent || [0, 500]}
          prefix="$"
          output
          min={0}
          max={2000}
          step={1}
          onChange={handleMoneySpentChange}
        />
      ),
    },
  ];

  const appliedFilters: IndexFiltersProps['appliedFilters'] = [];
  if (accountStatus && !isEmpty(accountStatus)) {
    const key = 'accountStatus';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, accountStatus),
      onRemove: handleAccountStatusRemove,
    });
  }
  if (moneySpent) {
    const key = 'moneySpent';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, moneySpent),
      onRemove: handleMoneySpentRemove,
    });
  }
  if (!isEmpty(taggedWith)) {
    const key = 'taggedWith';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, taggedWith),
      onRemove: handleTaggedWithRemove,
    });
  }
  /* FILTERS END */

  const { selectedResources, allResourcesSelected, handleSelectionChange } = useIndexResourceState(users);

  const rowMarkup = users.map(
    ({ id, email, role, fullName, createdAt, updatedAt, deletedAt }, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {fullName}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{email}</IndexTable.Cell>
        <IndexTable.Cell>{role}</IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric>
            {createdAt.slice(0, 10)}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{updatedAt.slice(0, 10)}</IndexTable.Cell>
        <IndexTable.Cell>{deletedAt}</IndexTable.Cell>
        </IndexTable.Row>
    ),
  );

  return (
    <LegacyCard>
      <IndexFilters
        sortOptions={sortOptions}
        sortSelected={sortSelected}
        queryValue={queryValue}
        queryPlaceholder="Searching in all"
        onQueryChange={handleFiltersQueryChange}
        onQueryClear={() => setQueryValue('')}
        onSort={(e) => {
          const [prop, type] = e[0].split(' ')
          setSort({ prop, type })
          setSortSelected(e)
        }}
        primaryAction={primaryAction}
        cancelAction={{
          onAction: onHandleCancel,
          disabled: false,
          loading: false,
        }}
        tabs={tabs}
        selected={selected}
        onSelect={setSelected}
        canCreateNewView
        onCreateNewView={onCreateNewView}
        filters={filters}
        appliedFilters={appliedFilters}
        onClearAll={handleFiltersClearAll}
        mode={mode}
        setMode={setMode}
      />
      <IndexTable
        condensed={useBreakpoints().smDown}
        resourceName={{ singular: 'user', plural: 'users' }}
        itemCount={users.length}
        selectedItemsCount={ allResourcesSelected ? 'All' : selectedResources.length }
        onSelectionChange={handleSelectionChange}
        headings={[
          { title: 'Full Name' },
          { title: 'Email' },
          { title: 'Role' },
          { title: 'Created At', alignment: 'end' },
          { title: 'Updated At' },
          { title: 'Deleted At' },
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );

  function disambiguateLabel(key: string, value: string | any[]): string {
    switch (key) {
      case 'moneySpent':
        return `Money spent is between $${value[0]} and $${value[1]}`;
      case 'taggedWith':
        return `Tagged with ${value}`;
      case 'accountStatus':
        return (value as string[]).map((val) => `Customer ${val}`).join(', ');
      default:
        return value as string;
    }
  }

  function isEmpty(value: string | string[]): boolean {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === '' || value == null;
    }
  }
}
