import {
  useTable,
  ITableColumn,
  ITableSettings,
  Paging,
  Table as AutoTable,
  ITableFeature,
} from "@tinqjs/tinjs-tw";
import { ForwardedRef, ReactNode, forwardRef, useState } from "react";
import * as R from "ramda";
import { mergeElProps } from "../../util/map";
import styled from "styled-components";
import tw from "twin.macro";
import { faArrowDown, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Loading from "./loading";
import { IconWithAnimation } from "./animation";
import { PopoverButton } from "./popover";

export declare type TableProps = {
  className?: string;
  default_columns?: ITableColumn[];
  settings?: ITableSettings;
  settingResponsive?: ListItemSettings;
  onChange?: (index: number) => void;
  data: any[];
  count: number;
  limit: number;
  children?: any;
  isResponsive?: boolean;
  isPaging?: boolean;
  isActiveAction?: boolean;
};

const TemplateTable = (
  {
    isPaging = true,
    data,
    default_columns,
    settings,
    className,
    children,
    count,
    isResponsive = false,
    settingResponsive,
    isActiveAction = true,
    limit,
    onChange,
  }: TableProps,
  ref: ForwardedRef<any>
) => {
  const { headers, body } = useTable({
    data: data,
    columns: default_columns,
    settings: settings,
  });

  const [activeData, setActiveData] = useState(null);
  // const { isLoadingData } = loadingService();

  return (
    <div className={className} ref={ref}>
      {children}
      <div className={`tableData ${isResponsive ? "responsiveTable" : null}`}>
        <AutoTable>
          <div {...headers.getProps()}>
            {headers.renderCell((th, i, props) => (
              <div
                key={i}
                {...R.mergeDeepWithKey(mergeElProps, th.getProps(), props)}
              >
                {th.val}
              </div>
            ))}
          </div>
          <Loading className="w-20 h-20" isShow={false}>
            {count != 0 ? (
              <>
                {body.rows.map((row, i) => (
                  <div key={i} {...row.getProps()}>
                    {row.renderCell((td, ii, props) => (
                      <div
                        key={ii}
                        {...R.mergeDeepWithKey(
                          mergeElProps,
                          td.getProps(),
                          props
                        )}
                      >
                        {td.val}
                      </div>
                    ))}
                  </div>
                ))}
              </>
            ) : (
              <div className="empty">No Data</div>
            )}
          </Loading>
        </AutoTable>
      </div>

      <div className={`${isResponsive ? "listData" : "hidden"}`}>
        <Loading className="w-20 h-20" isShow={false}>
          {count != 0 ? (
            data.map((detail, index) => (
              <div key={index}>
                <ListItemDetail
                  detail={detail}
                  activeData={activeData}
                  setActiveData={setActiveData}
                  settings={settingResponsive}
                  isActiveAction={isActiveAction}
                />
              </div>
            ))
          ) : (
            <div className="empty">No Data</div>
          )}
        </Loading>
      </div>

      {isPaging ? (
        <Paging data={data} count={count} onChange={onChange} limit={limit} />
      ) : null}
    </div>
  );
};

const ReferableTable = forwardRef(TemplateTable);

export const Table = styled(ReferableTable)`
  & .tableData {
    ${tw`w-full`}
    ${tw`overflow-y-auto`}
  }
  & .responsiveTable {
    ${tw`hidden`}
    ${tw`md:block`}
  }
  & .listData {
    ${tw`flex`}
    ${tw`md:hidden`}
    ${tw`flex-col`}
    ${tw`border-t-2`}
  }

  & .dataOpen {
    ${tw`h-96`}
  }
  & .dataClose {
    ${tw`h-auto`}
  }

  & .listData > div {
    ${tw`w-full`}
    ${tw`border-b-2`}
    ${tw`py-3`}
  }

  & .listData > div > .listItem > .popoverstyle > button {
    ${tw`h-auto`}
  }

  & .listData > div > .listItem > .popoverstyle > button > .header {
    ${tw`flex`}
    ${tw`justify-between`}
    ${tw`items-center`}
  }

  & .listData > div > .header {
    ${tw`flex`}
    ${tw`justify-between`}
    ${tw`items-center`}
  }

  &
    .listData
    > div
    > .listItem
    > .popoverstyle
    > button
    > .header
    > .sub-header {
    ${tw`w-full`}
    ${tw`flex`}
    ${tw`justify-start`}
    ${tw`gap-3`}
    ${tw`font-bold`}
  }
  & .listData > div > .header > .sub-header {
    ${tw`w-full`}
    ${tw`flex`}
    ${tw`justify-start`}
    ${tw`gap-3`}
    ${tw`font-bold`}
  }
  &
    .listData
    > div
    > .listItem
    > .popoverstyle
    > button
    > .header
    > .sub-header
    > .title {
    ${tw`w-full`}
    ${tw`flex`}
    ${tw`flex-col`}
    ${tw`items-start`}
  }
  & .listData > div > .header > .sub-header > .title {
    ${tw`w-full`}
    ${tw`flex`}
    ${tw`flex-col`}
    ${tw`items-start`}
  }
  &
    .listData
    > div
    > .listItem
    > .popoverstyle
    > button
    > .header
    > .sub-header
    > .titleAlternate {
    ${tw`w-full`}
    ${tw`flex`}
    ${tw`gap-3`}
    ${tw`justify-between`}
    ${tw`items-center`}
  }
  & .listData > div > .header > .sub-header > .titleAlternate {
    ${tw`w-full`}
    ${tw`flex`}
    ${tw`justify-between`}
    ${tw`items-center`}
  }
  &
    .listData
    > div
    > .listItem
    > .popoverstyle
    > button
    > .header
    > .sub-header
    > .titleAlternate
    > .detail-content {
    ${tw`flex`}
    ${tw`flex-col`}
    ${tw`text-left`}
  }
  &
    .listData
    > div
    > .header
    > .sub-header
    > .titleAlternate
    > .detail-content {
    ${tw`flex`}
    ${tw`flex-col`}
    ${tw`text-left`}
  }

  & .listData > div > .listItem > .popoverstyle > .panel {
    ${tw`border-0`}
  }
  & .listData > div > .listItem > .popoverstyle > .panel > .detail {
    ${tw`w-full`}
    ${tw`py-5`}
  }

  &
    .listData
    > div
    > .listItem
    > .popoverstyle
    > .panel
    > .detail
    > .list-content-detail {
    ${tw`w-full`}
    ${tw`flex`}
    ${tw`flex-col`}
    ${tw`justify-center`}
  }
  &
    .listData
    > div
    > .listItem
    > .popoverstyle
    > .panel
    > .detail
    > .list-content-detail
    > .content-detail {
    ${tw`relative`}
    ${tw`w-auto`}
    ${tw`flex`}
    ${tw`justify-between`}
    ${tw`gap-3`}
    ${tw`py-2`}
    ${tw`px-3`}
    ${tw`border-t-2`}
  }
  &
    .listData
    > div
    > .listItem
    > .popoverstyle
    > .panel
    > .detail
    > .list-content-detail
    > .content-detail:nth-child(even) {
    ${tw`bg-gray-200`}
  }

  & .empty {
    ${tw`flex`}
    ${tw`justify-center`}
    ${tw`text-2xl`}
    ${tw`py-5`}
    ${tw`text-black`}
  }
`;

export declare type ListItemSettingsTableDetail = {
  name: string;
  key?: string;
  feature?: string;
  width?: number;
  height?: number;
};

export declare type ListItemSettings = {
  header?: (data: any) => ReactNode;
  detail?: (data: any) => ReactNode;
};
declare type ListItemProps = {
  settings?: ListItemSettings;
  detail: any;
  activeData: any;
  setActiveData: any;
  isActiveAction?: Boolean;
};

const ListItemDetail = ({
  detail,
  activeData,
  setActiveData,
  isActiveAction,
  settings,
}: ListItemProps) => {
  const Header = () => (
    <div
      className="header"
      onClick={() =>
        detail?.id === activeData?.id
          ? setActiveData(null)
          : setActiveData(detail)
      }
    >
      <div className="sub-header">
        <span>{detail["no"]}.</span>
        {settings?.header(detail)}
      </div>
      <IconWithAnimation
        className={`${settings?.detail && !isActiveAction ? null : "hidden"}`}
        icon={faChevronDown}
        isAnimation={detail?.id === activeData?.id}
        from={"up"}
        to="down"
      />
    </div>
  );
  return settings?.detail ? (
    <PopoverButton
      className="listItem"
      disabled={!settings?.detail ? true : false}
      button={Header}
    >
      <div className={`detail py-5 w-full`}>{settings?.detail(detail)}</div>
    </PopoverButton>
  ) : (
    <Header />
  );
};

declare type TableContentDetail = {
  settingListItemDetail: ListItemSettingsTableDetail[];
  settingFeature: ITableSettings;
  detail: any;
  key?: any;
};
export const TableContentDetail = ({
  settingListItemDetail,
  settingFeature,
  detail,
}: TableContentDetail) => (
  <div className="list-content-detail ">
    {settingListItemDetail.map((data, index) => {
      const feature = settingFeature.features[data.feature] as ITableFeature;
      return (
        <div className="content-detail " key={index}>
          <span className="flex-1">{data?.name} </span>
          <span className="flex-0 text-right">
            {feature ? feature?.formatter(null, detail) : detail[data.key]}
          </span>
        </div>
      );
    })}
  </div>
);
