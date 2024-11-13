with open('2020/input/6.txt') as file:
    content = file.read().strip()

def a():
    groups = content.split('\n\n')

    sum_of_all_groups = 0
    for group in groups:
        group_yeses = set()
        for char in group:
            if char.isalpha():
                group_yeses.add(char)
        sum_of_all_groups += len(group_yeses)

    print(f'sum_of_all_groups: {sum_of_all_groups}')

def b():
    groups = content.split('\n\n')

    sum_of_all_groups = 0
    for group in groups:
        lines = group.split('\n')
        common_letters = [x for x in lines[0]]

        for i, line in enumerate(lines):
            if i == 0:
                continue
            common_letters = [x for x in common_letters if x in line]
            
        print('\n---group', group, '---common letters', common_letters, sep='\n')

        sum_of_all_groups += len(common_letters)
    print(f'sum_of_all_groups: {sum_of_all_groups}')

a()
b()
