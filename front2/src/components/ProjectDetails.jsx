import React, { useMemo } from 'react';
import {
    CategoryBox,
    CategoryNameBox,
    GapDiv,
    ProjectDetailContainer,
    StackBox,
    StackContainer,
    StackImg,
    StackListSpan,
} from '@/components/Styled/ProjectStyledComponents.jsx';

const ProjectDetails = ({ project }) => {
    if (!project) return null;

    // 각 카테고리별 스택 그룹화
    const stackGroups = useMemo(() => {
        const groups = {};
        project?.stackList.forEach((item) => {
            if (!groups[item.category]) {
                groups[item.category] = [];
            }
            groups[item.category].push(item);
        });
        return groups;
    }, [project]);

    // 카테고리 정렬
    const sortedCategories = useMemo(() => {
        return Object.keys(stackGroups).sort((a, b) => {
            return (
                stackGroups[a][0].categoryLevel -
                stackGroups[b][0].categoryLevel
            );
        });
    }, [stackGroups]);

    const maxStackCount = useMemo(() => {
        return Math.max(
            ...Object.values(stackGroups).map((group) => group.length),
        );
    }, [stackGroups]);

    // 각 카테고리에 빈값을 추가
    const stacksWithEmptyValues = useMemo(() => {
        const stacksWithEmpty = {};
        sortedCategories.forEach((category) => {
            const currentStacks = stackGroups[category] || [];
            const emptyCount = maxStackCount - currentStacks.length;
            stacksWithEmpty[category] = [
                ...currentStacks,
                ...Array.from({ length: emptyCount }).fill(''),
            ];
        });
        return stacksWithEmpty;
    }, [sortedCategories, stackGroups, maxStackCount]);

    return (
        <ProjectDetailContainer>
            <StackContainer>
                {sortedCategories.map((category, index) => (
                    <CategoryBox key={index}>
                        <CategoryNameBox>
                            <span>{category}</span>
                        </CategoryNameBox>
                        {stacksWithEmptyValues[category].map((item) => (
                            <StackBox key={item.stackSeq || Math.random()}>
                                {Object.keys(item).includes('stackImage') ? (
                                    <StackImg
                                        src={`/static/stack/${item.stackImage}`}
                                    />
                                ) : (
                                    <GapDiv></GapDiv>
                                )}
                                <StackListSpan>{item.stackName}</StackListSpan>
                            </StackBox>
                        ))}
                    </CategoryBox>
                ))}
            </StackContainer>
            <span
                dangerouslySetInnerHTML={{
                    __html: project.projectContributeRate,
                }}
            />
        </ProjectDetailContainer>
    );
};

export default ProjectDetails;
