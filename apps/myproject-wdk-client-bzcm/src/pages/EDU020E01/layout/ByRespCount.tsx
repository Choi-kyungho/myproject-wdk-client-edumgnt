import React, { useEffect, useState } from "react";
import { ResponsivePie } from '@nivo/pie';
import { RiOrganizationChart } from "react-icons/ri";

type PropsType ={
    data:any,
    onModalDisplay:(el) => void
}

const ByRespCount = ({data, onModalDisplay}: PropsType) => {

    const [graphData,setDataTemp]= React.useState<any>(data); 
    useEffect(()=>{
        setDataTemp(data)
    },[data])

    const handle = {
        padClick: (data: any) => {
            console.log(data);
            onModalDisplay(data);
        },

        legendClick: (data: any) => {
            console.log(data);
        },
    };
    return (
        // chart height이 100%이기 때문이 chart를 덮는 마크업 요소에 height 설정
        <div style={{ width: '740px', height: '430px', margin: '0 auto', paddingTop: '50px' }}>
            <div style={{paddingLeft: '347px', position: 'absolute', paddingTop: '187px' }}><RiOrganizationChart style={{width:'50px', height:'50px', color:'#7A3C04'}}></RiOrganizationChart></div>
            <div style={{ textAlign: 'center'}}><p style={{fontSize:'28px', fontWeight:'600', paddingBottom: '20px'}}>직급별 인원구성</p></div>
            <ResponsivePie
                /**
                 * chart에 사용될 데이터
                 */
                data={graphData}
                
                activeOuterRadiusOffset={8}
                /**
                 * chart margin
                 */
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                /**
                 * chart 중간 빈공간 반지름
                 */
                innerRadius={0.5}
                /**
                 * pad 간격
                 */
                padAngle={3}
                /**
                 * pad radius 설정 (pad별 간격이 있을 시 보임)
                 */
                cornerRadius={8}
                /**
                 * chart 색상
                 */
                //colors={['#7A3C04', '#B76A0B', '#FFA916', '#FFD573', '#FFF4D0' ]} // 커스터하여 사용할 때
                //colors={{ scheme: 'nivo' }} // nivo에서 제공해주는 색상 조합 사용할 때
                colors={{scheme: 'yellow_green_blue'}}
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
                arcLinkLabelsColor={'#FFA947'} // pad 색상에 따라감
                /**
                 * label (pad에 표현되는 글씨) skip할 기준 각도
                 */
                arcLabelsSkipAngle={10}

                sortByValue={true}

                theme={{
                    /**
                     * label style (pad에 표현되는 글씨)
                     */
                    labels: {
                        text: {
                            fontSize: 12,
                            fill: '#FFFFFF',
                            textShadow: '1px 1px 1px #000'
                        },
                    },
                    /**
                     * legend style (default로 하단에 있는 색상별 key 표시)
                     */
                    legends: {
                        text: {
                            fontSize: 12,
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
                        itemWidth: 90, // item width
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

export default ByRespCount;