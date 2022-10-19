import {
    ESGrid,
    getDate,
    GridHdBtnType,
    GridHeader,
    Retrive,
    userInfoGlobalState,
  } from "@vntgcorp/vntg-wdk-client";
  import React, { useEffect, useState } from "react";
import { ResponsivePie } from '@nivo/pie';
import { size } from "lodash";

type PropsType ={
    data:any
}

const LeftContentGraph = ({ data }: PropsType ) => {
    console.log("totalcount.tsx === props >>>>"+JSON.stringify(data));
    const [graphData,setDataTemp]= React.useState<any>(data); 

    useEffect(()=>{
        setDataTemp(data)
    },[data])

    const handle = {
        padClick: (data: any) => {
            console.log(data);
        },

        legendClick: (data: any) => {
            console.log(data);
        },
    };
    return (
        // chart height이 100%이기 때문이 chart를 덮는 마크업 요소에 height 설정
        <div style={{ width: '500px', height: '350px', margin: '0 auto'}}>
            <div style={{ textAlign: 'center'}}><p style={{fontSize: '20px'}}>부서별교육비현황</p></div>
            <ResponsivePie
                /**
                 * chart에 사용될 데이터
                 */
                data={graphData}
                activeOuterRadiusOffset={8}
                /**
                 * chart margin
                 */
                margin={{ top: 25, right: 80, bottom: 80, left: 80 }}
                /**
                 * chart 중간 빈공간 반지름
                 */
                innerRadius={0.5}
                /**
                 * pad 간격
                 */
                padAngle={1.8}
                /**
                 * pad radius 설정 (pad별 간격이 있을 시 보임)
                 */
                cornerRadius={8}
                /**
                 * chart 색상
                 */
                colors={['#B3EFFF', '#00CFFF', '#046B99', '#1C304A' ]} // 커스터하여 사용할 때
                //colors={{ scheme: 'nivo' }} // nivo에서 제공해주는 색상 조합 사용할 때
                /**
                 * pad border 두께 설정
                 */
                borderWidth={1}
                /**
                 * link label skip할 기준 각도
                 */
                arcLinkLabelsSkipAngle={0}
                /**
                 * link label 색상
                 */
                arcLinkLabelsTextColor="#000000"
                /**
                 * link label 연결되는 선 두께
                 */
                arcLinkLabelsThickness={1}
                /**
                 * link label 연결되는 선 색상
                 */
                arcLinkLabelsColor={{ from: 'color' }} // pad 색상에 따라감
                /**
                 * label (pad에 표현되는 글씨) skip할 기준 각도
                 */
                arcLabelsSkipAngle={10}
                theme={{
                    /**
                     * label style (pad에 표현되는 글씨)
                     */
                    labels: {
                        text: {
                            fontSize: 10,
                            fill: '#000000',
                        },
                    },
                    /**
                     * legend style (default로 하단에 있는 색상별 key 표시)
                     */
                    legends: {
                        text: {
                            fontSize: 11,
                            fill: '#000000',
                        },
                    },
                }}
                /**
                 * pad 클릭 이벤트
                 */
                onClick={handle.padClick}
                /**
                 * legend 설정 (default로 하단에 있는 색상별 key 표시)
                 */
                legends={[
                    {
                        anchor: 'bottom', // 위치
                        direction: 'row', // item 그려지는 방향
                        justify: false, // 글씨, 색상간 간격 justify 적용 여부
                        translateX: 0, // chart와 X 간격
                        translateY: 56, // chart와 Y 간격
                        itemsSpacing: 0, // item간 간격
                        itemWidth: 100, // item width
                        itemHeight: 18, // item height
                        itemDirection: 'left-to-right', // item 내부에 그려지는 방향
                        itemOpacity: 1, // item opacity
                        symbolSize: 18, // symbol (색상 표기) 크기
                        symbolShape: 'circle', // symbol (색상 표기) 모양
                        effects: [
                            {
                                // 추가 효과 설정 (hover하면 textColor를 olive로 변경)
                                on: 'hover',
                                style: {
                                    itemTextColor: 'olive',
                                },
                            },
                        ],
                        onClick: handle.legendClick, // legend 클릭 이벤트
                    },
                ]}
            />
        </div>
    );
};

export default LeftContentGraph;