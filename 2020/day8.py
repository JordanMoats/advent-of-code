with open('2020/input/8.txt') as file:
    content = file.read().strip()

def a():
    lines = content.split('\n')
    instructions = []
    for line in lines:
        op, arg = line.strip().split(' ')
        instructions.append((op, int(arg)))

    accumulator = 0
    visited_lines = set()
    i = 0
    while i not in visited_lines:
        visited_lines.add(i)         
        
        op, arg = instructions[i]

        if op == 'nop':
            i += 1
        elif op == 'acc':
            i += 1
            accumulator += arg
        else:
            i += arg

    print(f'accumulator: {accumulator}')

# does not work
def b():
    lines = content.split('\n')
    instructions = []
    for line in lines:
        op, arg = line.strip().split(' ')
        instructions.append((op, int(arg)))
    
    # If I work backwards, I can get a list of target rows, then check if flipping any row gets you to the target?
    target_rows = set()
    j = len(instructions) - 1
    while True:
        op, arg = instructions[j]
        
        if op == 'jmp' and arg <= 0:
            break
        else:
            target_rows.add(j)
        
    accumulator = 0
    i = 0
    while True:
        if i >= len(instructions):
            break
        op, arg = instructions[i]

        if op == 'nop':
            if i + arg in target_rows:
                i += arg
            else:
                i += 1
        elif op == 'jmp':
            if i + 1 in target_rows:
                i += 1
            else:
                i += arg
        else:
            accumulator += arg
            i += 1
    print('accumulator: ', accumulator)

a()
b()

