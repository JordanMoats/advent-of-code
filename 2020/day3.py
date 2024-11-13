with open('2020/input/3.txt') as file:
    content = file.read()

def a():
    grid = content.split('\n')[:-1]
    width = len(grid[0])

    tree_count = 0

    col = 0
    for row in grid:
        if row[col] == '#':
            tree_count += 1
        col = (col + 3) % width

    print(f'tree_count: {tree_count}')

def b():
    grid = content.split('\n')[:-1]
    width = len(grid[0])

    slopes = [(1,1), (3,1), (5,1), (7, 1),(1,2)]
    result = 1

    for right, down in slopes:
        tree_count = 0
        col = 0
        row = 0

        while row < len(grid):
            if grid[row][col] == '#':
                tree_count += 1

            col = (col + right) % width
            row += down

        result *= tree_count

    print(f'result: {result}')

a()
b()
